package com.project.smfinance.repository;

import com.project.smfinance.entity.ReferralDocument;
import java.util.Optional;

public interface ReferralDocumentRepository extends AbstractRepository<ReferralDocument> {
  Optional<ReferralDocument> findByDocumentKey(String key);
}
