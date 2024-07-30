import React, { useState, useEffect } from "react";
import { fetchData, saveData, deleteData } from './apiService';
import ToDo from './Todo';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ToDoList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await fetchData();
      if (result && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSaveData = async (newData) => {
    try {
      await saveData(newData);
      getData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await deleteData(id);
      getData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <h1 className="d-flex justify-content-center align-items-center mt-4" style={{color: "rgb(158, 120, 207)"}}>ToDo Master</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ToDo data={data} onSave={handleSaveData} onDelete={handleOnDelete} />
      )}
    </div> 
  );
};

export default ToDoList;
