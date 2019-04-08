workflow "New workflow" {
  resolves = ["vs"]
  on = "release"
}

action "vs" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "publish"
}

workflow "New workflow 1" {
  on = "push"
}
