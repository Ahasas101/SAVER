# Hardware Code Implementation

This directory contains the complete hardware-level implementation for the project, including microcontroller source code and custom Board Support Packages (BSPs) for GPS and GSM communication modules.

---

##  Directory Structure

```
Hardware_Code_Implementation/
│
├── Core/
│   └── Src/
│       ├── main.c
│       ├── gsm.c
│       ├── gsm.h
│       ├── gps.c
│       └── gps.h
```

---

##  Directory Description

### **Hardware_Code_Implementation/**

Root directory containing all firmware-related source files for the hardware system.

### **Core/**

Contains the core application logic and peripheral drivers.

### **Src/**

Holds all source and header files required for system operation.

* **main.c**
  Main application file responsible for system initialization, peripheral configuration, and program flow control.

* **gsm.c / gsm.h**
  Custom Board Support Package (BSP) for the GSM module.
  Handles GSM initialization, AT command communication, SMS/data transmission, and network interaction.

* **gps.c / gps.h**
  Custom Board Support Package (BSP) for the GPS module.
  Responsible for GPS initialization, data parsing, location extraction, speed extraction.

---
