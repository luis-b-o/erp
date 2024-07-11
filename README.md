# NestJS + Prisma ERP Software

This is a NodeJS application that uses Docker and Docker Compose to start a development environment.
The technologies used in this project are the following:
- NestJS v10 (with express)
- MySQL v8
- PrismaORM v5 (with Prisma Studio)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. **Clone the repository**

```
git clone https://github.com/luis-b-o/erp
cd erp
```

2. **Start the containers**

```
docker-compose up -d --build
```

This will spin up three containers:
- `mysql`: Runs MySQL database.
- `app`: Runs the NestJS application.
- `prisma-studio`: Runs the Prisma Studio at `http://localhost:5555`

### Accessing the Application

The NestJS application will be available at `http://localhost:3000`.

### Accessing the API Documentation
This project uses SwaggerUI for documenting the API, the documentation will be available at `http://localhost:3000/api`.


### Environment Variables

The application uses the following environment variables for database configuration:

- `DATABASE_URL`: Connection string of the database (default: `mysql://root:root@mysql:3306/erp`).


### Stopping the Containers

To stop the running containers, use:

```
docker-compose down
```

### Installing New Dependencies

1. To install a new dependency you need to run a terminal inside the `app` container, to do so, run this command at the root of the project:

```
docker exec -it app sh
```
This will give you interactive access to the `app` container.

2. Install the dependency inside the container:


```
npm install <some-dependency>
```

## Maintainers

This project is currently maintained by:

- [Bruno Stacheski](https://github.com/brunostc)
- [Luis Oliveira](https://github.com/luis-b-o)


## License

This project is licensed under the MIT License.
