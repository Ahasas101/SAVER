# SAVER – Smart Automated Vehicle Overspeed Regulator

## Overview

**SAVER (Smart Automated Vehicle Overspeed Regulator)** is an intelligent vehicle monitoring and enforcement system designed to automatically detect overspeeding and generate digital challans.
The system integrates embedded hardware with backend and frontend services to enable real-time vehicle tracking, violation detection, and challan management.

---

## Project Objective

The main objectives of this project are:

* Continuous monitoring of vehicle speed
* Automatic detection of overspeed violations
* Real-time transmission of vehicle data to a central server
* Automated challan generation and management

---

## System Architecture

The system is divided into three major components:

---

### 1. Embedded Hardware Unit (Vehicle Side)

#### Hardware Components

* **Microcontroller:** STM32F411CEU6
* **GSM Module:** A09G
* **GPS Module:** u-blox NEO-6

#### Functionality

* Continuously monitors vehicle speed using GPS data
* Compares speed with predefined speed limits
* Detects overspeed conditions
* Sends the following data to the backend server using GSM:

  * Vehicle unique ID
  * Current GPS coordinates
  * Vehicle speed

#### Self-Error Correction Mechanisms

* Automatic recovery from GPS signal loss
* GSM reconnection and retry mechanism
* Reset mechanism
  
  

---

### 2. Backend System

#### Responsibilities

* Receives real-time data from vehicle devices
* Stores vehicle, speed, and location data
* Processes overspeed violations
* Automatically generates challans
* Provides secure APIs for frontend communication

---

### 3. Frontend Application


#### Features

* Secure user authentication and login
* Dashboard for viewing vehicle data and violations
* Challan viewing and payment system
* User-friendly and responsive interface

---

## Data Flow

1. Vehicle exceeds the defined speed limit
2. Embedded system detects the overspeed condition
3. GPS and speed data are transmitted via GSM
4. Backend validates and stores the received data
5. Challan is generated automatically
6. User logs in to view and pay the challan

---


## Contributors

* **Ahasas Yadav**
* **Rudresh Joshi**
  

---


