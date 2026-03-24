# Production Checklist

## Operational Excellence

- [ ] Define an incident response plan for your team, including escalation paths, communication channels, and rollback strategies for deployments
- [ ] Familiarize yourself with how to stage, promote and rollback deployments
- [ ] Ensure caching is configured if deploying using a monorepo to prevent unnecessary builds
- [ ] Perform a zero downtime migration to Vercel DNS

## Security

- [ ] Implement a Content Security Policy (CSP) and proper security headers
- [ ] Enable Deployment Protection to prevent unauthorized access to your deployments
- [ ] Configure the Vercel Web Application Firewall (WAF) to monitor, block, and challenge incoming traffic. This includes setting up custom rules, IP blocking, and enabling managed rulesets for enhanced security
- [ ] Enable Log Drains to persist logs from your deployments
- [ ] Review common SSL certificate issues
- [ ] Enable a Preview Deployment Suffix to use a custom domain for Preview Deployments
- [ ] Commit your lockfiles to pin dependencies and speed up builds through caching
- [ ] Consider implementing rate limiting to prevent abuse
- [ ] Review and implement access roles to ensure the correct permissions are set for your team members
- [ ] Enable SAML SSO and SCIM (Enterprise plans with Owner role only)
- [ ] Enable Audit Logs to track and analyze team member activity (Enterprise plans with Owner role only)
- [ ] Ensure that cookies comply with the allowed cookie policy to enhance security. (Enterprise plans with Owner role only)
- [ ] Setup a firewall rule to block requests from unwanted bots to your project deployment

## Reliability

- [ ] Enable Observability Plus to debug and optimize performance, investigate errors, monitor traffic, and more (Available on Pro and Enterprise plans)
- [ ] Enable automatic Function failover to add multi-region redundancy and protect against regional outages (Enterprise plans only)
- [ ] If using Secure Compute, enable a passive failover region to ensure continued operation during regional outages (Enterprise plans only)
- [ ] Implement caching headers for static assets or Function responses to reduce usage or origin requests
- [ ] Understand the differences between caching headers and Incremental Static Regeneration
- [ ] Consider adding Tracing to instrument your application for distributed tracing
- [ ] Consider running a load test on your application to stress your upstream services (Enterprise plans only)

## Performance

- [x] Enable Speed Insights for instant access to field performance data and Core Web Vitals
- [x] Enable Analytics (from Vercel Analytics integration)
- [ ] Review your Time To First Byte (TTFB) to ensure your application is responding quickly
- [ ] Ensure you are using Image Optimization to reduce the size of your images
- [ ] Ensure you are using Script Optimization to optimize script loading performance
- [ ] Ensure you are using Font Optimization to remove external network requests for improved privacy and performance
- [ ] Ensure your Vercel Function region is the same as your origin API or database
- [ ] Consider the limitations of placing a third-party proxy in front of Vercel, and notify your Vercel account representative (Enterprise customers) for guidance

## Cost Optimization

- [ ] Enable Fluid compute to reduce cold starts, optimize concurrency, and enhance function scalability
- [ ] Follow our manage and optimize usage guides to understand how to optimize your usage, and manage your costs
- [ ] Configure Spend Management to manage your usage and trigger alerts on usage changes
- [ ] Review or adjust the maximum duration, and memory for your Vercel Functions
- [ ] Ensure Incremental Static Regeneration (ISR) revalidation times are set appropriately to match content changes or move to on-demand revalidation
- [ ] For teams created before February 18th, 2025, opt in to the new image optimization pricing to ensure the lowest cost, and review best practices.
- [ ] Move large media files such as GIFs and videos to blob storage
