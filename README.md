# Patient Management Dashboard

A patient management dashboard developed with React 18 and TypeScript. The application allows users to view patient records from an API, perform local CRUD operations, search, filter, sort, and switch between Turkish and English languages.

## Features

* Fetch patient data from API
* Add new patients locally
* Edit existing patient records
* Delete patient records locally
* Search patients by name
* Filter patients by status
* Sort patients by appointment date
* Patient detail modal
* Turkish / English language support
* Responsive design

## Tech Stack

* React 18
* TypeScript
* Redux Toolkit
* React Router
* Axios
* i18next
* Tailwind CSS
* Vite

## Project Structure

The project is organized using the Atomic Design approach.

```text
components/
├── atoms
├── molecules
├── organisms
└── templates
```

## Installation

```bash
yarn install
```

## Run Development Server

```bash
yarn dev
```

## Build Project

```bash
yarn build
```

## Live Demo

Vercel deployment link will be shared here.

## Notes

This project was developed as a technical case study. API data is fetched remotely, while create, update and delete operations are managed locally through Redux state.

### Language Support

The application supports Turkish and English UI translations. Interface texts are translated, while patient-related data (e.g. names, departments, and status values) is displayed as received from the API.
