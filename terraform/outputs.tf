#Log the load balancer app URL
output "app_url" {
  value = aws_alb.application_load_balancer.dns_name
}

output "foo" {
  value = { for tuple in regexall("(.*)=(.*)", file("../.env")) : tuple[0] => tuple[1] }
}