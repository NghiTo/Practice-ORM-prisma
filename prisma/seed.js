import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  await prisma.offices.createMany({
    data: [
      {
        officeCode: "1",
        city: "New York",
        phone: "212-555-1234",
        addressLine1: "123 5th Ave",
        addressLine2: "Suite 101",
        state: "NY",
        country: "USA",
        postalCode: "10001",
        territory: "NA",
      },
      {
        officeCode: "2",
        city: "San Francisco",
        phone: "415-555-5678",
        addressLine1: "456 Market St",
        addressLine2: "Floor 2",
        state: "CA",
        country: "USA",
        postalCode: "94105",
        territory: "NA",
      },
      {
        officeCode: "3",
        city: "London",
        phone: "020-7946-0958",
        addressLine1: "789 Kings Rd",
        addressLine2: "null",
        state: null,
        country: "UK",
        postalCode: "SW10 0LB",
        territory: "EMEA",
      },
      {
        officeCode: "4",
        city: "Tokyo",
        phone: "03-1234-5678",
        addressLine1: "101 Shibuya Crossing",
        addressLine2: "null",
        state: "Tokyo",
        country: "Japan",
        postalCode: "150-0002",
        territory: "APAC",
      },
      {
        officeCode: "5",
        city: "Sydney",
        phone: "02-9876-5432",
        addressLine1: "202 George St",
        addressLine2: "Level 5",
        state: "NSW",
        country: "Australia",
        postalCode: "2000",
        territory: "APAC",
      },
    ],
  });

  const officeList = await prisma.offices.findMany(); 

  await Promise.all(
    officeList.map((office) =>
      prisma.employees.create({
        data: {
          employeeNumber: parseInt(office.officeCode) * 1000 + 999, 
          lastName: "9999",
          firstName: "Auto",
          extension: `x${office.officeCode}99`,
          email: `auto${office.officeCode}@example.com`,
          officeCode: office.officeCode,
          reportsTo: null, 
          jobTitle: "Staff",
        },
      })
    )
  );

  // Insert data into the employees table
  await prisma.employees.createMany({
    data: [
      {
        employeeNumber: 1,
        lastName: "Doe",
        firstName: "John",
        extension: "x123",
        email: "johndoe@example.com",
        officeCode: "1",
        reportsTo: null,
        jobTitle: "President",
      },
      {
        employeeNumber: 2,
        lastName: "Smith",
        firstName: "Jane",
        extension: "x124",
        email: "janesmith@example.com",
        officeCode: "1",
        reportsTo: 1,
        jobTitle: "Manager",
      },
      {
        employeeNumber: 3,
        lastName: "Brown",
        firstName: "Mike",
        extension: "x125",
        email: "mikebrown@example.com",
        officeCode: "2",
        reportsTo: 1,
        jobTitle: "Leader",
      },
      {
        employeeNumber: 4,
        lastName: "Davis",
        firstName: "Emily",
        extension: "x126",
        email: "emilydavis@example.com",
        officeCode: "2",
        reportsTo: 1,
        jobTitle: "Staff",
      },
      {
        employeeNumber: 5,
        lastName: "Johnson",
        firstName: "Chris",
        extension: "x127",
        email: "chrisjohnson@example.com",
        officeCode: "2",
        reportsTo: 1,
        jobTitle: "Staff",
      },
    ],
  });

  // Insert data into the users table
  await prisma.users.createMany({
    data: [
      {
        username: "jane",
        password: await hash("1234564@", 12),
        employeeNumber: 2,
      },
      {
        username: "mike",
        password: await hash("1234564@", 12),
        employeeNumber: 3,
      },
      {
        username: "emily",
        password: await hash("1234564@", 12),
        employeeNumber: 4,
      },
    ],
  });

  // Insert data into the customers table
  await prisma.customers.createMany({
    data: [
      {
        customerNumber: 1,
        customerName: "Customer A",
        contactLastName: "Smith",
        contactFirstName: "Will",
        phone: "123-456-7890",
        addressLine1: "123 Main St",
        addressLine2: "null",
        city: "Anytown",
        state: "CA",
        postalCode: "90210",
        country: "USA",
        salesRepEmployeeNumber: 2,
        creditLimit: 50000,
      },
      {
        customerNumber: 2,
        customerName: "Customer B",
        contactLastName: "Johnson",
        contactFirstName: "Emma",
        phone: "234-567-8901",
        addressLine1: "456 Elm St",
        addressLine2: "null",
        city: "Othertown",
        state: "NY",
        postalCode: "10001",
        country: "USA",
        salesRepEmployeeNumber: 3,
        creditLimit: 75000,
      },
      {
        customerNumber: 3,
        customerName: "Customer C",
        contactLastName: "Williams",
        contactFirstName: "Olivia",
        phone: "345-678-9012",
        addressLine1: "789 Pine St",
        addressLine2: "Apt 101",
        city: "Sometown",
        state: "TX",
        postalCode: "73301",
        country: "USA",
        salesRepEmployeeNumber: 4,
        creditLimit: 60000,
      },
      {
        customerNumber: 4,
        customerName: "Customer D",
        contactLastName: "Brown",
        contactFirstName: "Sophia",
        phone: "456-789-0123",
        addressLine1: "101 Maple St",
        addressLine2: "Suite 202",
        city: "Anycity",
        state: "FL",
        postalCode: "33101",
        country: "USA",
        salesRepEmployeeNumber: 5,
        creditLimit: 90000,
      },
      {
        customerNumber: 5,
        customerName: "Customer E",
        contactLastName: "Jones",
        contactFirstName: "Ava",
        phone: "567-890-1234",
        addressLine1: "202 Oak St",
        addressLine2: "nill",
        city: "Bigcity",
        state: "IL",
        postalCode: "60601",
        country: "USA",
        salesRepEmployeeNumber: 2,
        creditLimit: 55000,
      },
    ],
  });

  // Insert data into the productlines table
  await prisma.productlines.createMany({
    data: [
      {
        productLine: "Classic Cars",
        textDescription: "High-quality replicas of classic cars",
        htmlDescription:
          "<p>High-quality replicas of <strong>classic cars</strong></p>",
        image: "https://example.com/images/classic_cars.png",
      },
      {
        productLine: "Motorcycles",
        textDescription: "Detailed models of famous motorcycles",
        htmlDescription:
          "<p>Detailed models of famous <em>motorcycles</em></p>",
        image: "https://example.com/images/motorcycles.png",
      },
      {
        productLine: "Planes",
        textDescription: "Realistic models of historical planes",
        htmlDescription:
          "<p>Realistic models of historical <em>planes</em></p>",
        image: "https://example.com/images/planes.png",
      },
      {
        productLine: "Trains",
        textDescription: "Replica models of iconic trains",
        htmlDescription:
          "<p>Replica models of iconic <strong>trains</strong></p>",
        image: "https://example.com/images/trains.png",
      },
      {
        productLine: "Ships",
        textDescription: "Detailed models of famous ships",
        htmlDescription:
          "<p>Detailed models of famous <strong>ships</strong></p>",
        image: "https://example.com/images/ships.png",
      },
    ],
  });

  // Insert data into the products table
  await prisma.products.createMany({
    data: [
      {
        productCode: "S10_1678",
        productName: "1969 Harley Davidson Ultimate Chopper",
        productLine: "Motorcycles",
        productScale: "1:10",
        productVendor: "Min Lin Diecast",
        productDescription:
          "This replica features working kickstand, front suspension, gear-shift lever.",
        quantityInStock: 7933,
        buyPrice: 48.81,
        MSRP: 95.7,
      },
      {
        productCode: "S10_1949",
        productName: "1952 Alpine Renault 1300",
        productLine: "Classic Cars",
        productScale: "1:10",
        productVendor: "Classic Metal Creations",
        productDescription: "Turnable front wheels; steering function.",
        quantityInStock: 7305,
        buyPrice: 98.58,
        MSRP: 214.3,
      },
      {
        productCode: "S12_3891",
        productName: "1965 Aston Martin DB5",
        productLine: "Classic Cars",
        productScale: "1:12",
        productVendor: "Studio M Art Models",
        productDescription:
          "Detailing includes chrome exhaust, bumpers, and working head lights.",
        quantityInStock: 2305,
        buyPrice: 85.66,
        MSRP: 144.9,
      },
      {
        productCode: "S18_4027",
        productName: "1940 Ford Pickup Truck",
        productLine: "Trains",
        productScale: "1:18",
        productVendor: "Motor City Art Classics",
        productDescription:
          "Comes with working doors and hood, detailed engine.",
        quantityInStock: 1562,
        buyPrice: 34.99,
        MSRP: 64.99,
      },
      {
        productCode: "S24_2841",
        productName: "1998 Chrysler Plymouth Prowler",
        productLine: "Motorcycles",
        productScale: "1:24",
        productVendor: "Unimax Art Galleries",
        productDescription: "Highly detailed model with accurate scale.",
        quantityInStock: 1005,
        buyPrice: 30.0,
        MSRP: 55.0,
      },
    ],
  });

  // Insert data into the orders table
  await prisma.orders.createMany({
    data: [
      {
        orderDate: new Date("2024-08-01T00:00:00Z"),
        requiredDate: new Date("2024-08-05T00:00:00Z"),
        shippedDate: new Date("2024-08-03T00:00:00Z"),
        status: "Shipped",
        Comment: "Deliver to front door",
        customerNumber: 1,
      },
      {
        orderDate: new Date("2024-08-02T00:00:00Z"),
        requiredDate: new Date("2024-08-07T00:00:00Z"),
        shippedDate: new Date("2024-08-06T00:00:00Z"),
        status: "Shipped",
        Comment: "Leave at reception",
        customerNumber: 2,
      },
      {
        orderDate: new Date("2024-08-03T00:00:00Z"),
        requiredDate: new Date("2024-08-10T00:00:00Z"),
        shippedDate: new Date("2024-08-08T00:00:00Z"),
        status: "Shipped",
        Comment: "Call upon arrival",
        customerNumber: 3,
      },
      {
        orderDate: new Date("2024-08-04T00:00:00Z"),
        requiredDate: new Date("2024-08-09T00:00:00Z"),
        shippedDate: new Date("2024-08-07T00:00:00Z"),
        status: "Shipped",
        Comment: "Ring the bell",
        customerNumber: 4,
      },
      {
        orderDate: new Date("2024-08-05T00:00:00Z"),
        requiredDate: new Date("2024-08-12T00:00:00Z"),
        shippedDate: new Date("2024-08-10T00:00:00Z"),
        status: "Shipped",
        Comment: "Handle with care",
        customerNumber: 5,
      },
    ],
  });

  // Insert data into the orderdetails table
  await prisma.orderdetails.createMany({
    data: [
      {
        orderNumber: 1,
        productCode: "S10_1678",
        quantityOrdered: 30,
        priceEach: 95.7,
        orderLineNumber: 1,
      },
      {
        orderNumber: 1,
        productCode: "S10_1949",
        quantityOrdered: 20,
        priceEach: 214.3,
        orderLineNumber: 2,
      },
      {
        orderNumber: 2,
        productCode: "S12_3891",
        quantityOrdered: 50,
        priceEach: 144.9,
        orderLineNumber: 1,
      },
      {
        orderNumber: 2,
        productCode: "S18_4027",
        quantityOrdered: 10,
        priceEach: 64.99,
        orderLineNumber: 2,
      },
      {
        orderNumber: 3,
        productCode: "S24_2841",
        quantityOrdered: 25,
        priceEach: 55.0,
        orderLineNumber: 1,
      },
      {
        orderNumber: 4,
        productCode: "S10_1678",
        quantityOrdered: 35,
        priceEach: 95.7,
        orderLineNumber: 1,
      },
      {
        orderNumber: 4,
        productCode: "S10_1949",
        quantityOrdered: 15,
        priceEach: 214.3,
        orderLineNumber: 2,
      },
      {
        orderNumber: 5,
        productCode: "S12_3891",
        quantityOrdered: 40,
        priceEach: 144.9,
        orderLineNumber: 1,
      },
      {
        orderNumber: 5,
        productCode: "S18_4027",
        quantityOrdered: 20,
        priceEach: 64.99,
        orderLineNumber: 2,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
