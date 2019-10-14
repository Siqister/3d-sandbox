# 3D sandbox

## To run any sub-project with dev server
```
npm start -- PROJECT-NAME
```

## To deploy any sub-project
```
npm run build -- PROJECT-NAME
git push origin master
```
A git hook will deploy the built project to [surge](https://surge.sh/help/deploying-continuously-using-git-hooks)