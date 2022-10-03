package com.opensource.pharraxz.utils;

import org.slf4j.MDC;
import reactor.core.publisher.Signal;
import reactor.core.publisher.SignalType;
import reactor.util.context.Context;

import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;

import static com.opensource.pharraxz.common.MdcHeaderFilter.CONTEXT_MAP;

public final class LogUtil {

    private LogUtil() {}

    /**
     * Even though subscriberContext is the last piece of the chain,
     * it is the one that gets executed first (due to its subscription time nature,
     * and the fact that the subscription signal flows from bottom to top).
     * @param key log key
     * @param value log value
     * @return lambda function for context mapping
     */
    public static Function<Context, Context> put(final String key, final String value) {
        return context -> {
            final Optional<Map<String, String>> optionalContextMap = context.getOrEmpty(CONTEXT_MAP);

            if (optionalContextMap.isPresent()) {
                optionalContextMap.get().put(key, value);
                return context;
            } else {
                return context.put(CONTEXT_MAP, Map.of(key, value));
            }
        };
    }

    public static <T> Consumer<Signal<T>> logOnNext(final Consumer<T> log) {
        return signal -> {
            if (signal.getType() != SignalType.ON_NEXT) {
                return;
            }

            final Optional<Map<String, String>> maybeContextMap = signal.getContextView().getOrEmpty(CONTEXT_MAP);

            if (maybeContextMap.isEmpty()) {
                log.accept(signal.get());
            } else {
                MDC.setContextMap(maybeContextMap.get()); // MDC = Mapped Diagnostic Context
                try {
                    log.accept(signal.get());
                } finally {
                    MDC.clear();
                }
            }
        };
    }

    public static <T> Consumer<Signal<T>> logOnError(final Consumer<Throwable> log) {
        return signal -> {
            if (!signal.isOnError()) {
                return;
            }

            final Optional<Map<String, String>> maybeContextMap = signal.getContextView().getOrEmpty(CONTEXT_MAP);

            if (maybeContextMap.isEmpty()) {
                log.accept(signal.getThrowable());
            } else {
                MDC.setContextMap(maybeContextMap.get()); // MDC = Mapped Diagnostic Context
                try {
                    log.accept(signal.getThrowable());
                } finally {
                    MDC.clear();
                }
            }
        };
    }

}
