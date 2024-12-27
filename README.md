# Разделение проекта на микрофронтенды

## Уровень 1. Проектирование

Для разделения проекта на микрофронтенды было рассмотрено два популярных подхода:

1. **Webpack Module Federation**
2. **Single SPA**

### Webpack Module Federation

#### Преимущества:

- **Простота интеграции:** подходит для работы с проектами на React без значительного рефакторинга.
- **Динамическая загрузка модулей:** снижение объема начальной загрузки за счет подгрузки только необходимых модулей.
- **Локальная разработка:** упрощает работу отдельных команд, так как модули разрабатываются и деплоятся независимо.
- **Совместимость:** Webpack широко используется в React-проектах.

#### Ограничения:

- Ограничен работой с одним фреймворком.

### Single SPA

#### Преимущества:

- **Поддержка нескольких фреймворков:** можно объединить приложения на React, Angular, Vue и других технологиях.
- **Улучшает время первоначальной загрузки:** поддерживает ленивую загрузку, что позволяет загружать только необходимые фрагменты кода по требованию. Это улучшает время первоначальной загрузки и оптимизирует использование ресурсов.
- **Позволяет развёртывать микрофронтенды независимо:** фреймворк позволяет командам разрабатывать и развёртывать свои части приложения отдельно.

#### Ограничения:

- Более сложная настройка по сравнению с Webpack Module Federation.

### Описание решения

Для текущего проекта, который полностью написан на React, **Webpack Module Federation** является оптимальным выбором благодаря следующим причинам:

- Простота внедрения в существующий проект.
- Быстрая настройка и минимальные изменения в текущей архитектуре.
- Возможность динамической загрузки модулей для улучшения производительности.

Выбор **Webpack Module Federation** обеспечит простоту и скорость разделения React-проекта на микрофронтенды. Это решение позволит в перспективе командам работать над модулями независимо, обеспечивая при этом высокую производительность и легкость интеграции.

Если в будущем потребуется интеграция модулей на других (различных) фреймворках, можно будет рассмотреть переход на **Single SPA**.

## Уровень 2. Планирование изменений

Микрофронтэнды:

- host 8080
- footer 8081
- header 8082
- auth 8083
- avatar 8084
- profile 8085
- images 8086

1. создал проект MF host
2. перенес в host полный проект (потребовался переход с 17 на 18 версию react)
3. для обеспечения работоспособности

- дополнительно установил react-router-dom для BrowserRouter
- дополнительно установил file-loader и отредактировал webpack config для работы с svg
