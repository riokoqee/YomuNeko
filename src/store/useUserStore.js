import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,  // Добавляем поле для токена

      // Функция регистрации
      register: async (name, email, password) => {
        try {
          const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            console.error(data.message);  
            return false;
          }
      
          console.log('Sending data to server:', { name, email, password });
          console.log(data);
      
          set({ user: { name, email }, token: data.token }); // Сохраняем токен
      
          return true;
        } catch (error) {
          console.error('Ошибка регистрации:', error);
          return false;
        }
      },

      // Функция логина
      login: async (loginOrEmail, password) => {
        try {
          const response = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginOrEmail, password }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            console.error(data.message);
            return false;
          }
      
          set({ user: data.user, token: data.token }); // Сохраняем токен
          return true;
        } catch (error) {
          console.error('Ошибка входа:', error);
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null }); // Убираем токен при логауте
      },

      // Функция для обновления имени пользователя
      updateUserName: (newName) => {
        set((state) => {
          if (state.user) {
            return { user: { ...state.user, name: newName } }; 
          }
          return state;
        });
      },
    }),
    {
      name: 'user-storage', 
    }
  )
);

export default useUserStore;
