#!/bin/bash
sudo docker start zookeeper
sleep 40
sudo docker start kafka
sleep 40
sudo docker start schema-registry
sleep 40
sudo docker ps
