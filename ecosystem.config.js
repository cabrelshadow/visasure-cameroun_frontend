module.exports = {
    apps: [{
      name: "visasure-api",
      script: "npm",
      args: "run dev",
      watch: ["src"],
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      interpreter: "ts-node"
    }]
};