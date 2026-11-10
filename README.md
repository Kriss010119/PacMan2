# Электроника: Пакмен

Привет! ^^

Вы играете за неутомимого Пакмена, который путешествует по трем стилизованным мирам, собирая конфетки и избегая встречи с призраками и другими опасными существами:

- Уровень 1 - классический неоновый лабиринт под новогоднюю песенку Jingle Bells
- Уровень 2 - лесной пейзаж с лисичками и ежиком
- Уровень 3 - мистический уровень с атмосферой "Каролина в стране кошмаров"

## 2. Запуск приложения

Для запуска проекта выполните следующие команды:

```bash
# Установка зависимостей
npm ci

# Запуск сервера
npm run dev

# Сборка production-бандла
npm run build
```

Также можно запустить Storybook, но там пока только 3 сториса маленьких :)

```bash
npx storybook dev -p 6006
```

В целом из прикольного:

- добавлена музыка, которая стопается при выходе с экрана браузера
- поддерживается управление с клавиатуры и с помощью мышки
- несколько уровней
- были найдены и подключены пиксельные шрифты
- мне очень нравится слева панельки с рекордами/счетом/уровнями, они супер атмосферные получились
- в браузере у сайта настроена иконка пакмена


---

  
# Electronics: Pac-Man

Hi there! ^^

You play as the tireless Pac-Man, traveling through three stylized worlds, collecting candies and avoiding encounters with ghosts and other dangerous creatures:

- **Level 1** — a classic neon maze set to the Jingle Bells holiday tune
- **Level 2** — a forest landscape with foxes and a hedgehog
- **Level 3** — a mystical level with a "Coraline" atmosphere

## 2. Running the Application

To run the project, execute the following commands:

```bash
# Install dependencies
npm ci

# Start the dev server
npm run dev

# Build the production bundle
npm run build
```

You can also launch Storybook, though there are only 3 small stories so far :)

```bash
npx storybook dev -p 6006
```

Some of the fun stuff overall:

- Music has been added that stops when you leave the browser tab
- Both keyboard and mouse controls are supported
- Multiple levels
- Pixel fonts were sourced and integrated
- I really love the high-scores/score/levels panels on the left — they turned out super atmospheric
- The site has a Pac-Man favicon configured in the browser