# TimeSphere

## 🎯 Plan of Action

The project addresses the following constraints to enhance timetable management:

- No overlapping classes for any teacher.
- Each class should have only one teacher during a lecture.
- A teacher cannot teach more than one subject to the same class.
- Each subject is taught to a class only once.
- Total teaching hours must not exceed available hours.
- A teacher can only conduct one subject lecture per class each day.
- Users can configure how often subjects appear in the timetable.
- Settings for maximum daily lectures and working days are adjustable.

![image](https://github.com/JoshIri360/timetable-scheduler/assets/91752742/1c99f9c5-913a-45c4-83f8-3ae50fb73c42)


## 🚀 Installation Guidelines

### Prerequisite

Ensure the following tools are installed on your system:

- [git](https://git-scm.com/downloads)
- [node/npm](https://nodejs.org/en/download/)

### Fork/Clone the Repository:

1. Fork the project using the fork button on the top right corner.
2. Obtain the clone URL by clicking the green `code` button.
3. Open a terminal at your desired location and execute the following command, substituting `REPO_URL` with your copied URL:

```
git clone REPO_URL
```

### Set Project Configurations:

- Create a firebase account and configure the .env variables in the frontend.
- Download the serviceAccountKey.json from your firebase project and place it in the `backend/constants` directory.

### Open Two Terminals:

- Navigate to the project's root directory in the first terminal for **frontend** operations.
- In the second terminal, navigate to the **backend** folder or start at the root and use the command below to switch:

```
cd backend
```

### Install Required Packages/Dependencies:

Execute the following in both terminals to install dependencies:

```bash
npm install
```

### Run the Project:

After ensuring all dependencies are installed, use the following command in both terminals to start the project:

```bash
npm start
```

The application link will be displayed in the frontend terminal.

For subsequent runs, repeat steps 2 and 4 only.

## 👨🏻‍💻 Contributing

Please review the [contributing guidelines](contributing.md) prior to submitting any pull requests.

## 📧 Contact Us

For any queries regarding the project installation, please feel free to contact us.

## 🔑 License & Conduct

- This project is [MIT Licensed](LICENSE).
- Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).
