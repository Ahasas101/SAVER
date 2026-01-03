export const mockVehicleData = {
  vehicleNumber: "DL01AB1234",
  ownerName: "Rajesh Kumar",
  vehicleType: "Private Car",
  make: "Maruti Suzuki",
  model: "Swift Dzire",
  year: "2021",
  fuelType: "Petrol",
  registrationDate: "15-03-2021",
  insuranceStatus: "Valid until 14-03-2025",
  challans: [
    {
      id: "CH001",
      violation: "Overspeeding",
      date: "12-01-2025",
      time: "14:30 PM",
      location: "MG Road, New Delhi",
      speed: "85 km/h",
      speedLimit: "60 km/h",
      amount: 2000,
      status: "Pending",
      camera: "CAM-MG-001"
    },
    {
      id: "CH002",
      violation: "Overspeeding",
      date: "08-01-2025",
      time: "09:15 AM",
      location: "Ring Road, CP",
      speed: "95 km/h",
      speedLimit: "70 km/h",
      amount: 3000,
      status: "Pending",
      camera: "CAM-CP-015"
    }
  ]
};