package com.project.smfinance.config;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {

    final String jwt = getAuthToken(request);
    final String adminEmail;

    if (jwt == null) {
      filterChain.doFilter(request, response);
      return;
    }

    try {
      log.debug("Token from header {}", jwt);
      adminEmail = jwtService.extractUsername(jwt);
      if (adminEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(adminEmail);
        if (jwtService.isTokenValid(jwt, userDetails)) {
          UsernamePasswordAuthenticationToken authToken =
              new UsernamePasswordAuthenticationToken(
                  userDetails, null, userDetails.getAuthorities());
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      }
    } catch (ExpiredJwtException e) {
      log.error("Expired Auth Token Passed");
      throw e;
    } catch (SignatureException | MalformedJwtException e) {
      log.error("Invalid Token Signature exception");
      throw e;
    } catch (UnsupportedJwtException e) {
      log.error("UnSupported Auth Token");
      throw e;
    } catch (Exception e) {
      log.error(e.getMessage());
      log.error("UnKnown Exception");
      throw e;
    }

    filterChain.doFilter(request, response);
  }

  private String getAuthToken(HttpServletRequest request) {
    String token = request.getHeader("Authorization");
    if (StringUtils.isBlank(token) || !token.startsWith("Bearer")) {
      log.error("Auth Token Missing in header");
      return null;
    }
    return token.substring(7);
  }
}
