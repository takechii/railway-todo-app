import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './tasks.scss'; // スタイルシートをインポート

const Tasks = (props) => {
  const { tasks, selectListId, isDoneDisplay } = props;
  if (tasks === null) return <></>;

  const calculateRemainingTime = (limit) => {
    const now = new Date();
    const deadline = new Date(limit);
    const diff = deadline - now;
    if (diff <= 0) return '期限切れ';
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days}日${hours}時間${minutes}分`;
  };

  const renderTasks = (done) => (
    <ul>
      {tasks
        .filter((task) => task.done === done)
        .map((task, key) => (
          <li key={key} className="task-item">
            <Link
              to={`/lists/${selectListId}/tasks/${task.id}`}
              className="task-item-link"
            >
              <div className="task-info">
                <span>
                  {task.title}
                  {task.done ? '完了' : '未完了'}
                </span>
                <div className="task-deadline">
                  期限日時: {task.limit}
                  <br />
                  残り時間: {calculateRemainingTime(task.limit)}
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );

  return isDoneDisplay === 'done' ? renderTasks(true) : renderTasks(false);
};

// PropTypesの追加
Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      limit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectListId: PropTypes.string.isRequired,
  isDoneDisplay: PropTypes.string.isRequired,
};

export default Tasks;
