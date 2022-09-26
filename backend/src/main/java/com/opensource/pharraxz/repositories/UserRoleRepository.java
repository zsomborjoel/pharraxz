package com.opensource.pharraxz.repositories;

import com.opensource.pharraxz.entities.UserRole;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends ReactiveCrudRepository<UserRole, Long> {
}
