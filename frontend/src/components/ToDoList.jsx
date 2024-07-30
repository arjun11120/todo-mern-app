import React, { useState, useEffect } from "react";
import { fetchData, saveData, deleteData } from './apiService';
import ToDo from './Todo';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            );
            getData();
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire(
              'Error!',
              'There was a problem deleting your task.',
              'error'
            );
          });
      }
    });
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