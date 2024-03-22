package com.project.smfinance.controller;

import com.project.smfinance.models.dashboard.DashboardEntityItemsCountResponse;
import com.project.smfinance.models.response.ApiResponse;
import com.project.smfinance.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor(onConstructor = @__({@Autowired}))
public class DashboardController {

  private final DashboardService dashboardService;

  @GetMapping("/entityItemsCount")
  public ResponseEntity<ApiResponse<DashboardEntityItemsCountResponse>> getEntityItemsCount() {
    return new ResponseEntity<>(dashboardService.getEntityItemsCount(), HttpStatus.OK);
  }
}
