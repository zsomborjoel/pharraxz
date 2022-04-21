package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.Role;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface RoleRepository extends ReactiveCrudRepository<Role, Long> {

    @Query("select r.* " +
            "from roles r " +
            "join user_roles ur " +
            "    on r.role_id = ur.role_id " +
            "join users u " +
            "    on ur.user_id = u.user_id " +
            "    and u.username = :username")
    Flux<Role> findRolesByUsername(String username);
}
