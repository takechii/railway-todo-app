import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { url } from '../const';
import './editTask.css';

export const EditTask = () => {
  const { listId, taskId } = useParams();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/lists/${listId}/tasks/${taskId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        const task = res.data;
        setTitle(task.title);
        setDetail(task.detail);
        setIsDone(task.done);
      })
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      });
  }, [cookies.token, listId, taskId]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleIsDoneChange = (e) => setIsDone(e.target.value === 'done');

  const onUpdateTask = () => {
    const data = {
      title: title,
      detail: detail,
      done: isDone,
    };

    axios
      .put(`${url}/lists/${listId}/tasks/${taskId}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate(`/lists/${listId}`);
      })
      .catch((err) => {
        setErrorMessage(`タスクの更新に失敗しました。${err}`);
      });
  };

  const onDeleteTask = () => {
    axios
      .delete(`${url}/lists/${listId}/tasks/${taskId}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate(`/lists/${listId}`);
      })
      .catch((err) => {
        setErrorMessage(`タスクの削除に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <Header />
      <main className="edit-task">
        <h2>タスク編集</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="edit-task-form">
          <label>タイトル</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="edit-task-title"
          />
          <br />
          <label>詳細</label>
          <br />
          <input
            type="text"
            value={detail}
            onChange={handleDetailChange}
            className="edit-task-detail"
          />
          <br />
          <label>ステータス</label>
          <br />
          <input
            type="radio"
            id="todo"
            name="status"
            value="todo"
            onChange={handleIsDoneChange}
            checked={!isDone}
          />
          <label htmlFor="todo">未完了</label>
          <br />
          <input
            type="radio"
            id="done"
            name="status"
            value="done"
            onChange={handleIsDoneChange}
            checked={isDone}
          />
          <label htmlFor="done">完了</label>
          <br />
          <button
            type="button"
            onClick={onUpdateTask}
            className="edit-task-button"
          >
            更新
          </button>
          <button
            type="button"
            onClick={onDeleteTask}
            className="delete-task-button"
          >
            削除
          </button>
        </form>
      </main>
    </div>
  );
};
