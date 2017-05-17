# Angular 1 examples of $broadcast and $on  

I'm creating this examples for learn about the comunication bewten controllers, I'm working two scenarios

* parent controller --> child controller 1
* independent controller <--> independent controller 2

## parent-->child
this looks like this....
```
<div ng-controller="parentController">
  <!-- some content -->
  <div ng-controller="childController">
    <!-- some content -->
  </div>
</div>
```

### this example can be found [on this file](https://github.com/abelardogg/ng-1-broadcast/blob/master/parent-child.html)

## independent <--> independent
this looks like this....
```
<div ng-controller="sometController">
  
  <!-- some content -->
  
</div>

<div ng-controller="otherController">
  
  <!-- some content -->
  
</div>
```
### this example can be found [on this file](https://github.com/abelardogg/ng-1-broadcast/blob/master/anon-broadcast.html)

## $rootScope

http://www.dotnettricks.com/img/angularjs/emit-broadcast.png


