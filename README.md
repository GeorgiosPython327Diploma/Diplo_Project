# Django проект 'Universal Digest Family'

Universal Digest Family - это гостевой блог, позволяющий пользователям добавлять статьи, а также взаимодействовать между собой путем комментирования, ставки лайков и дизлайков, а также обмена сообщениями между участниками.

## Функциональность проекта

- Добавление статей и контента: Пользователи могут создавать и публиковать статьи и другой контент.
- Комментирование: Пользователи могут оставлять комментарии к статьям.
- Лайки и дизлайки: Пользователи могут выражать свое мнение о статьях и контенте, ставя лайки или дизлайки.
- Обмен сообщениями: Авторизованные пользователи могут обмениваться личными сообщениями между собой.

## Структура проекта

Проект содержит следующие приложения:

- **accounts**: Приложение для управления пользователями, включая регистрацию, вход в систему, профили пользователей и личные сообщения.
  - `admin.py`: Регистрация модели `User` в административной панели Django.
  - `apps.py`: Конфигурация приложения `accounts`.
  - `forms.py`: Формы для работы с пользователями и сообщениями.
  - `models.py`: Модели данных, включая расширенную модель пользователя `User` и модель сообщения `Message`.
  - `urls.py`: Маршруты URL для приложения `accounts`, включая обработчики запросов для регистрации, входа, профилей пользователей и управления сообщениями.
  - `views.py`: Представления для обработки запросов, связанных с пользователями и сообщениями.
  - `templates/accounts/`: Шаблоны для управления пользователями, включая страницы регистрации (`register.html`), входа (`login.html`), профилей (`user_profile.html`, `public_profile.html`, `bio.html`), изменения пароля (`change-password.html`), редактирования профиля (`edit_profile.html`) и отправки сообщений (`compose.html`), а также просмотра входящих сообщений (`inbox.html`).



- **articles**: Приложение для управления статьями и контентом блога.
  - `admin.py`: Регистрация моделей `Article`, `Bookmark` и `Category` в административной панели Django.
  - `apps.py`: Конфигурация приложения `articles`.
  - `forms.py`: Формы для работы со статьями, комментариями и закладками.
  - `models.py`: Модели данных, включая модели `Article`, `Category`, `Comment` и `Bookmark`.
  - `urls.py`: Маршруты URL для приложения `articles`, включая обработчики запросов для просмотра статей, добавления комментариев, лайков/дизлайков статей, управления закладками и других действий.
  - `views.py`: Представления для обработки запросов, связанных со статьями, комментариями и другим контентом.
  - `templates/articles/`: Шаблоны для отображения статей, комментариев и другого контента, включая страницы просмотра статей (`review_article.html`), добавления статей (`add_article.html`), комментариев (`add_comment.html`), а также управления закладками (`user_bookmarks.html`), редактирования статей (`edit_article.html`) и просмотра статистики (`about_project.html`).




- **core**:
  - `apps.py`: Конфигурация приложения `core`.
  - `urls.py`: Маршруты URL для приложения `core`, включая обработчики запросов для домашней страницы и других страниц.
  - `views.py`: Представления для обработки запросов, связанных с основными страницами приложения.
  - `templates/core/`: Шаблоны для отображения основных страниц приложения, включая домашнюю страницу (`base.html`).
  - `static/core/`: Статические файлы для приложения `core`, включая папки `css`, `images` и `js`.




- **udf**:
  - `settings.py`: Настройки проекта Django, включая конфигурацию базы данных, маршрутизацию URL, настройки статических файлов и другие параметры.
  - `urls.py`: Основные маршруты URL для проекта `udf`, включая включение маршрутов для административной панели, приложения `core`, `accounts` и `articles`, а также обработку статических файлов в режиме отладки.



#### Папка "media"

В этой папке хранятся медиафайлы, загруженные пользователями, такие как изображения, видео и аудио.

#### Папка "staticfiles"

Папка, содержащая статические файлы, собранные с помощью команды `collectstatic` Django. Включает в себя файлы CSS, JavaScript и изображения, используемые в проекте.

#### Файл "manage.py"

Файл для запуска различных команд управления проектом Django, таких как запуск локального сервера, создание миграций базы данных, сборка статических файлов и другие административные задачи.




## Стек технологий

Проект разработан с использованием следующего стека технологий:

- **Backend:**
  - Django: Фреймворк для создания веб-приложений на языке Python.


- **Frontend:**
  - HTML: Язык разметки гипертекста.
  - CSS: Технология для стилизации веб-страниц.
  - JavaScript: Язык программирования для создания интерактивных элементов на веб-страницах.

## Использование библиотек

Проект использует следующие библиотеки:

### Серверные библиотеки:
 
 - **Django-TinyMCE**: - это приложение для Django, которое интегрирует редактор TinyMCE в административный интерфейс Django для удобного редактирования текста с использованием форматирования.


 - **Pillow**: - это форк библиотеки Python Imaging Library (PIL), предоставляющий мощные средства для работы с изображениями.

### Клиентские библиотеки:

 - **jQuery**: jQuery - это быстрая, многофункциональная JavaScript библиотека.



 - **GSAP (GreenSock Animation Platform)**: GSAP - это мощная библиотека анимации JavaScript, которая позволяет создавать высокопроизводительные анимации для веб-сайтов и приложений.
 


### Хостинг ссылка на проект
   
```
georgios7.pythonanywhere.com
```
    

## Запуск проекта

Для запуска проекта выполните следующие шаги:

1. Убедитесь, что Python установлен на вашем компьютере. Если нет, установите его с официального сайта Python: [Python Downloads](https://www.python.org/downloads/)

2. Установите PyCharm или откройте его, если он уже установлен. Создайте новый проект.

3. В терминале PyCharm клонируйте репозиторий проекта:

   ```bash
   git clone https://github.com/MRGeorgioDev8/Diplo_Project.git


4. В терминале PyCharm выполните следующие команды:

   
Перейдите в директорию проекта: 
  ```
  cd Diplo_Project
  ```
   
  Установите зависимости проекта:
  ```
  pip install -r requirements.txt
  ```

  Запустите сервер разработки:
  ```
  python manage.py runserver
  ```
5. Перейдите по ссылке сервера Django.