package com.opensource.pharraxz.common;

import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class MdcHeaderFilter implements WebFilter {
    private static final String MDC_HEADER_PREFIX = "X-MDC-";
    public static final String CONTEXT_MAP = "context-map";

    /**
     * Reactor comes with a Context in which one can put data to be associated with a particular Flux rather than a Thread
     * @param ex the current server exchange
     * @param chain provides a way to delegate to the next filter
     * @return void
     */
    @Override
    public Mono<Void> filter(final ServerWebExchange ex, final WebFilterChain chain) {
        ex.getResponse().beforeCommit(
                () -> addContextToHttpResponseHeaders(ex.getResponse())
        );

        return chain.filter(ex).contextWrite(
                addRequestHeadersToContext(ex.getRequest())
        );
    }

    public static Function<Context, Context> addRequestHeadersToContext(final ServerHttpRequest request) {
        return context -> {
            final Optional<Map<String, String>> optionalContextMap = context.getOrEmpty(CONTEXT_MAP);

            final Map<String, String> contextMap = request
                    .getHeaders().toSingleValueMap().entrySet()
                    .stream()
                    .filter(x -> x.getKey().startsWith(MDC_HEADER_PREFIX))
                    .collect(
                            Collectors.toMap(v -> v.getKey().substring(MDC_HEADER_PREFIX.length()),
                                    Map.Entry::getValue
                            )
                    );

            if (optionalContextMap.isPresent()) {
                return context;
            } else {
                return context.put(CONTEXT_MAP, contextMap);
            }
        };
    }

    private Mono<Void> addContextToHttpResponseHeaders(final ServerHttpResponse response) {
        return Mono.deferContextual(ctx -> {
            if (!ctx.hasKey(CONTEXT_MAP)) {
                return Mono.empty();
            }

            final HttpHeaders headers = response.getHeaders();
            ctx.<Map<String, String>>get(CONTEXT_MAP).forEach(
                    (key, value) -> headers.add(MDC_HEADER_PREFIX + key, value)
            );

            return  Mono.empty();
        }).then();
    }

}
