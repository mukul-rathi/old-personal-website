---
series: Demystifying Deep Learning 
part: Part 3
title: Learning Through Gradient Descent
layout: default
comments: true
date:   2018-08-28 13:00:00
excerpt: Diving into how machine learning algorithms "learn" 
image: "/assets/blog/GradDescent/grad-descent.png"
caption: "Gradient descent on loss function surface <br> <em>credit: Andrew Ng Coursera</em>"
---
Having looked at linear and logistic regression, we will look at how these algorithms "learn". 

## Loss Functions: 

For a machine algorithm to learn, it needs some way of evaluating its performance. The **loss function**  (aka cost function) is a function that quantifies the errors in its predictions - lower error is better. Thus, a way for the algorithm to improve is to minimise this loss function, which, if chosen correctly, will also result in the model learning. The algorithm can tweak its weights and biases to get the value of the loss function as low as possible. When thinking of the correct loss function to use, it helps to think about the problem we are trying to solve:

**Intuition:** 
For linear regression, we want to plot a straight line of best fit - i.e one that is as close to as many of the points as possible. So one good idea is to minimise the mean distance between the straight line and the points. So we take the difference between the prediction and the actual value, then square it (so it ensures the value is always positive), and then do this for all predictions and take the mean.
 
 **Maths:**
We denote the loss function as $$ J(W,b) $$. Note the factor of  $$\frac{1}{2}$$ is for convenience.

$$ J(W,b) = \frac{1}{2m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})^2 $$

 **Code:**
 As before we are continuing with the same motivating examples of housing prices for linear regression and breast cancer for logistic regression. You can access the full code in the accompanying [Jupyter notebook](https://github.com/mukul-rathi/blogPost-tutorials/blob/master/LinearLogisticRegression/LinearLogisticRegression.ipynb).

 ```python 

    def MSE_loss(Y, Y_pred):
        m = Y.shape[1])
        return (1.0/(2*m))*np.sum(np.square(Y_pred-Y))

 ```

Next, moving onto logistic regression:

**Intuition:** The aim with logistic regression is to maximise the probability of getting the correct label across all the examples.

 **Maths:** 
Here, it is easier to present the intuition interspersed with the maths:

For a single example, we want:

$$ \operatorname*{argmax}_{W,b} P(y|x;W,b) $$

This translates to finding $$W, b$$ that maximise the probability of getting the correct label $$y$$ given the value of $$x$$, parameterised by $$W, b$$. Since each training example is independent of each other, to get the total probability we multiply the probabilities together:

$$  \operatorname*{argmax}_{W,b} \prod_{i=1}^{m} P(y^{(i)}|x^{(i)};W,b) $$

This could lead to underflow, when multiplying tiny probabilities together, so instead we take the log and maximise that. Since $$\log{(xy)}=\log{x+\log{y}}$$ we now have:

$$  \operatorname*{argmax}_{W,b} \sum_{i=1}^{m} \log{P(y^{(i)}|x^{(i)};W,b)}$$

If we recall our interpretation of the output of logistic regression, we have that:

$$ P(y=1|x;W,b) = \hat{y}^{(i)}$$

$$ P(y=0|x;W,b) = 1 -\hat{y}^{(i)}$$

Putting all these pieces together, it is time to look at the loss function for logistic regression:

$$ J(W,b) = \frac{-1}{m} \sum_{i=1}^{m} y^{(i)} \log(\hat{y}^{(i)}) + (1-y^{(i)}) \log(1-\hat{y}^{(i)})$$

Breaking it down:
* First, we have a negative sign in front of the entire expression: this is because we want to maximise the log probability, but we can only minimise the loss function.
* We divide the sum by $$m$$ - this corresponds to the "mean" probability, and since $$m$$ is the same for all $$W,b$$ it doesn't affect our objective.

* There are two terms in the summation: the first is $$ \log{P(y=1|x;W,b)} $$
 and the second is 
 $$ \log{P(y=0|x;W,b)} $$
 . These combine to give $$ \log{P(y|x;W,b)} $$ since when $$y=0$$ only the second term contributes, and likewise when $$y=1$$ only the first term contributes, since the $$y^{(i)}$$ and $$1 - y^{(i)}$$ terms set the other to zero respectively.





 **Code:**

```python 

    def log_loss(Y, Y_pred):
    m = Y.shape[1]
        return (-1.0/m)*np.sum(Y*np.log(Y_pred) + (1-Y)*np.log(1-Y_pred))

 ```

So now that we have defined our loss function, let's look at how we minimise it:
## Gradient Descent: 
**Intuition:** 
    
Think of the loss function as a surface with hills and valleys, and the current value of the loss for the algorithm as a point on this surface (see above image). We want to minimise it, so we want to keep taking steps down the slope of the surface into the valley.

The slope of the surface is the gradient at that point, and so we want to keep taking steps in the direction down the gradient to the minimum, where the gradient is 0. This is the gradient descent algorithm.

**Maths:** 

The gradient descent update equation is as follows:

$$ W= W - \alpha \frac{\partial \mathcal{J} }{\partial W} $$

$$ b = b - \alpha \frac{\partial \mathcal{J} }{\partial b} $$


$$\alpha$$ is the learning rate **hyperparameter** - this controls the size of the step we take each iteration. If  $$\alpha$$ is too large we may overshoot the minimum and diverge, whereas if  $$\alpha$$ is too small it will take too long to converge to the minimum.

Now it's time to compute $$\frac{\partial{J} }{\partial W} $$ and $$\frac{\partial{J} }{\partial b} $$. This can seem intimidating at first glance, so we will break the calculation down into chunks.  

Luckily for us, the **chain rule** lets us decompose the calculation into smaller, less intimidating steps. 
For linear regression the equations are:

$$\hat{y} = \sum_{j=1}^{n}{w_jx_j} + b $$

$$ J(W,b) = \frac{1}{2m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})^2 $$

So we can break the calculation down into two steps: $$\frac{\partial{J} }{\partial {\hat{y}^{(i)}}} $$ and $$\frac{\partial{\hat{y}^{(i)}} }{\partial {W_j}} / \frac{\partial{\hat{y}^{(i)}} }{\partial {b}}$$.

This is why we have the factor of $$\frac{1}{2}$$ to cancel out:

$$\frac{\partial{J} }{\partial \hat{y^{(i)}}} = \frac{1}{m} x^{(i)}(\hat{y}^{(i)} - y^{(i)})$$



$$\frac{\partial{J}}{\partial{W}} =  \frac{1}{m} \sum_{i=1}^{m} x^{(i)}(\hat{y}^{(i)} - y^{(i)})$$

$$\frac{\partial{J}}{\partial{b}} =  \frac{1}{m} \sum_{i=1}^{m}(\hat{y}^{(i)} - y^{(i)}) $$

The first equation in matrix form is:

$$\frac{\partial{J}}{\partial{W}} =  \frac{1}{m} (\hat{Y} - Y).X^{T}$$



**Code:** 

```python

    def grads(X, Y, Y_pred):
        m = Y.shape[1]
        dW = (1.0/m)*np.dot(Y_pred-Y,X.T)
        db = (1.0/m)*np.sum((Y_pred-Y),axis=1,keepdims=True)
        return dW, db

    dW, db = grads(X, Y, Y_pred)

    #gradient descent update 
    W = W -  alpha*dW
    b = b - alpha*db

```




## Conclusion: 

With the last two posts, you have now coded up your first two machine learning algorithms, and trained them! Machine learning can be applied to diverse datasets - the motivating examples that you trained your algorithms - housing prices and  breast cancer classification - being two great examples of that!

If you made it through the maths, you've understood the fundamentals of most learning algorithms - we'll use this as building blocks for neural networks next. 
