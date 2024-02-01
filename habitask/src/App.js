import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ListTasks from './components/ListTasks';
import AddTask from './components/AddTask';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/list-tasks"
          element={<PrivateRoute component={ListTasks} />}
        />
        <Route
          path="/add-task"
          element={<PrivateRoute component={AddTask} />}
        />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!sessionStorage.getItem('token');
  // Aquí puedes agregar lógica para verificar si el usuario está autenticado (usando un token, por ejemplo)
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default App;
