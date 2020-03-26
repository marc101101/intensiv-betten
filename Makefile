SHELL := /bin/bash
.DEFAULT_GOAL := help

###########################
# VARIABLES
###########################
BUILD_ENV := NONE

###########################
# MAPPINGS
###########################

DOCKER_COMPOSE_NONE :=
DOCKER_COMPOSE_COMPOSE := docker-compose run dev

DOCKER_COMPOSE := $(DOCKER_COMPOSE_$(BUILD_ENV))
###########################
# TARGETS
###########################

.PHONY: help
help:  ## help target to show available commands with information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) |  awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: information
information:  ## Data Collector: echo some build information
	@echo 'set build env to $(BUILD_ENV) and DOCKER_COMPOSE to $(DOCKER_COMPOSE)'
	@echo 'use make -e BUILD_ENV=COMPOSE <target> for using docker-compose build environment' 

.PHONY: bootstrap
bootstrap: ## Data Collector:  Build Container
	@if [ $(BUILD_ENV) = "COMPOSE" ]; then\
        docker-compose build;\
    fi
	$(DOCKER_COMPOSE) npm ci

.PHONY: shell
shell: ## Data Collector: Open shell with dev dependencies installed in zsh
	cd data_collector && docker-compose run dev zsh

.PHONY: sls-deploy
sls-deploy: ## Data Collector: Deploys serverless lambda
	cd data_collector && npx sls deploy 

.PHONY: sls-remove
sls-remove: ## Data Collector: Remove serverless lambda
	cd data_collector && npx sls remove 

.PHONY: invoke
invoke: ## Data Collector: Invoke given function remotely
ifndef FN
	$(error Argument FN must be provided and filled with the function name)
endif
	cd data_collector &&  npx sls invoke --function ${FN}

.PHONY: invoke-local
invoke-local: ## Data Collector: Invoke given function locally
ifndef FN
	$(error Argument FN must be provided and filled with the function name)
endif
	cd data_collector &&  npx sls invoke local --function ${FN}

.PHONY: start-app
start-app: ## Application: Start app in dev mode
	cd app && npm run serve 

.PHONY: build-app
build-app: ## Application: Build app 
	cd app && npm run build 
	