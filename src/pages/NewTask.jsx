import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { url } from '../const';
import './newTask.css';

export const NewTask = () => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [listId, setListId] = useState('');
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
        setListId(res.data[0]?.id || '');
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, [cookies.token]); // 依存関係に cookies.token を追加

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleListIdChange = (e) => setListId(e.target.value);

  const onCreateTask = () => {
    const data = {
      title: title,
      detail: detail,
    };

    axios
      .post(`${url}/lists/${listId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigate(`/lists/${listId}`);
      })
      .catch((err) => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <Header />
      <main className="new-task">
        <h2>新規タスク作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <label>リスト</label>
          <br />
          <select
            value={listId}
            onChange={handleListIdChange}
            className="new-task-select-list"
          >
            {lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
          <br />
          <label>タイトル</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="new-task-title"
          />
          <br />
          <label>詳細</label>
          <br />
          <input
            type="text"
            value={detail}
            onChange={handleDetailChange}
            className="new-task-detail"
          />
          <br />
          <button
            type="button"
            onClick={onCreateTask}
            className="new-task-button"
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
};
