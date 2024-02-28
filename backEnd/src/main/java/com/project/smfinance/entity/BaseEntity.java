package com.project.smfinance.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public abstract class BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false)
  protected long id;

  @Version
  @Column(name = "version", nullable = false)
  protected Long version = 0L;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false, nullable = false)
  protected LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", updatable = true, nullable = false)
  protected LocalDateTime updatedAt;
}
