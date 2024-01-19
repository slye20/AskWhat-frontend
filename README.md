# AskWhat-Frontend

Frontend of AskWhat, an online forum for CVWO assignment.
Built with React.js with TypeScript

Backend Repository: https://github.com/slye20/AskWhat-backend/

Link to deployed app: https://askwhat-1b26934c0d62.herokuapp.com/

Creator: Samuel Lim Yong En

## Download Instructions

Install Git, Node and yarn if you haven't already.

Clone the repository:

```
git clone https://github.com/slye20/AskWhat-frontend
```

Install all dependencies:

```
yarn install
```

Run application

```
yarn start
```

And now you can visit the site with the URL http://localhost:3001

## What's included

```
src
├── App.css
├── App.tsx
├── index.css
├── index.tsx
├── components
│   ├── Comment
│   │   ├── CommentCard.tsx
│   │   ├── CommentForm.tsx
│   │   ├── CommentItem.tsx
│   │   ├── CommentList.tsx
│   │   └── MakeComment.tsx
│   ├── Forum
│   │   ├── ForumCard.tsx
│   │   ├── ForumForm.tsx
│   │   ├── ForumList.tsx
│   │   ├── MainPostCard.tsx
│   │   └── MainPost.tsx
│   ├── Login
│   │   └── LoginForm.tsx
│   ├── NavBar
│   │   ├── CategorySelector.tsx
│   │   ├── NavBar.tsx
│   │   └── SearchBox.tsx
│   ├── SignUp
│   │   └── SignUpForm.tsx
│   └── UI
│       ├── CustomButton.tsx
│       └── CustomTextField.tsx
├── constants
│   └── constants.tsx
├── hooks
│   ├── useCategoryView.tsx
│   ├── useCommentHandler.tsx
│   ├── useForm.tsx
│   ├── useForumForm.tsx
│   ├── useForumHandler.tsx
│   ├── useMenu.tsx
│   └── useThreadData.tsx
├── pages
│   ├── CategoryView.tsx
│   ├── CreateNewThread.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── SignUp.tsx
│   └── ThreadView.tsx
├── services
│   ├── CreateCommentService.tsx
│   ├── CreateTheadService.tsx
│   ├── DeleteCommentService.tsx
│   ├── DeleteThreadService.tsx
│   ├── LoginService.tsx
│   ├── ReadAllThreadsService.tsx
│   ├── ReadCategoryListService.tsx
│   ├── ReadCategoryService.tsx
│   ├── ReadThreadService.tsx
│   ├── SignUpService.tsx
│   ├── UpdateCommentService.tsx
│   └── UpdateThreadService.tsx
└── types
    ├── Category.tsx
    ├── Comment.tsx
    └── Thread.tsx
```

## More information

Material-UI (MUI) for a consistent and responsive design.
