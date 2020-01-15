---
series: Demystifying Deep Learning
part: 3
title: Learning Through Gradient Descent
datePublished: 2018-08-03 13:00:00
excerpt: Diving into how machine learning algorithms "learn"
image: "./grad-descent.png"
caption: "Gradient descent on loss function surface <br> credit: Andrew Ng Coursera"
include_KaTeX: true
redirect_from: /2018/08/03/GradDescent.html
---

Having looked at linear and logistic regression, we will look at how these algorithms "learn".

## Loss Functions:

For a machine algorithm to learn, it needs some way of evaluating its performance. The **loss function** (aka cost function) is a function that quantifies the errors in its predictions - lower error is better. Thus, a way for the algorithm to improve is to minimise this loss function, which, if chosen correctly, will also result in the model learning. The algorithm can tweak its weights and biases to get the value of the loss function as low as possible. When thinking of the correct loss function to use, it helps to think about the problem we are trying to solve:

**Intuition:**
For linear regression, we want to plot a straight line of best fit - i.e one that is as close to as many of the points as possible. So one good idea is to minimise the mean distance between the straight line and the points. In $n$ dimensions, we consider the distance between the point and the hyperplane - i.e. take the difference between the prediction _(projection of the value onto the plane)_ and the actual value. We then square it (so it ensures the value is always positive), and then do this for all predictions and take the mean.

**Maths:**
We denote the loss function as $$ J(W,b) $$. Note the factor of $$\frac{1}{2}$$ is for convenience.

$$ J(W,b) = \frac{1}{2m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})^2 $$

**Code:**
As before we are continuing with the same motivating examples of housing prices for linear regression and breast cancer for logistic regression. You can access the full code in the accompanying [Jupyter notebook](https://github.com/mukul-rathi/deep-learning-tutorials/blob/master/LinearLogisticRegression/LinearLogisticRegression.ipynb).

```python
def MSE_loss(Y, Y_pred):
   m = Y.shape[1]
   return (1.0/(2*m))*np.sum(np.square(Y_pred-Y))
```

Next, moving onto logistic regression:

**Intuition:** The aim with logistic regression is to maximise the probability of getting the correct label across all the examples.

**Maths:**
Here, it is easier to present the intuition interspersed with the maths:

For a single example, we want:

$$ _{W,b}^{argmax} P(y|x;W,b) $$

This translates to finding $$W, b$$ that maximise the probability of getting the correct label $$y$$ given the value of $$x$$, parameterised by $$W, b$$. Since each training example is independent of each other, to get the total probability we multiply the probabilities together:

$$  _{W,b}^{argmax} \prod_{i=1}^{m} P(y^{(i)}|x^{(i)};W,b) $$

This could lead to underflow, when multiplying tiny probabilities together, so instead we take the log and maximise that. Since $$\log{(xy)}=\log{x+\log{y}}$$ we now have:

$$  _{W,b}^{argmax} \sum_{i=1}^{m} \log{P(y^{(i)}|x^{(i)};W,b)}$$

If we recall our interpretation of the output of logistic regression, we have that:

$$ P(y^{(i)}|x^{(i)};W,b) = \begin{cases}  \hat{y}^{(i)} &\text{if } y^{(i)}=1 \\ 1 -\hat{y}^{(i)} &\text{if } y^{(i)}=0 \end{cases}$$

Putting all these pieces together, it is time to look at the loss function for logistic regression:

$$ J(W,b) = \frac{-1}{m} \sum_{i=1}^{m} y^{(i)} \log(\hat{y}^{(i)}) + (1-y^{(i)}) \log(1-\hat{y}^{(i)})$$

Breaking it down:

- First, we have a negative sign in front of the entire expression: this is because we want to maximise the log probability, but we can only minimise the loss function.
- We divide the sum by $$m$$ - this corresponds to the "mean" probability, and since $$m$$ is the same for all $$W,b$$ it doesn't affect our objective.

- There are two terms in the summation: the first is $$ \log{P(y^{(i)}=1|x^{(i)};W,b)} $$
  and the second is
  $$ \log{P(y^{(i)}=0|x^{(i)};W,b)} $$
  . These combine to give $$ \log{P(y^{(i)}|x^{(i)};W,b)} $$ since when $$y=0$$ only the second term contributes, and likewise when $$y=1$$ only the first term contributes, since the $$y^{(i)}$$ and $$1 - y^{(i)}$$ terms set the other to zero respectively.

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

$$\alpha$$ is the learning rate **hyperparameter** - this controls the size of the step we take each iteration. If $$\alpha$$ is too large we may overshoot the minimum and diverge, whereas if $$\alpha$$ is too small it will take too long to converge to the minimum.

Now it's time to compute $$\frac{\partial{J} }{\partial W} $$ and $$\frac{\partial{J} }{\partial b} $$.

When thinking about computing partial derivatives, it helps to have an intuitive understanding, to make sense of the maths expression that results, especially when we later try to take partial derivatives with respect to each value in a matrix.

Some ideas worth bearing in mind as we go into this calculation and more complicated expressions later on:

- _Partial Derivative Intuition_: Think of $$\frac{\partial{y}}{\partial{x}} $$ loosely as quantifying how much $$y$$ would change if you gave the value of $$x$$ a little "nudge" at that point.
- _Breaking down computations_ - we can use the **chain rule** to aid us in our computation - rather than trying to compute the derivative in one fell swoop, we break up the computation into smaller intermediate steps.

- _Computing the chain rule_ - when thinking about which intermediate values to include in our chain rule expression, think about the immediate outputs of equations involving $$x$$ - which other values get directly affected when I slightly nudge $$x$$?

Let's apply these ideas in the context of linear and logistic regression - the key here is not so much the equations themselves, but to build up this intuition, since we can boil down most of the more advanced networks with this same reasoning:

First, linear regression - we'll break it down into two steps:

$$ \hat{y}^{(i)} = \sum_{j=1}^{n} W_jx^{(i)}_j + b $$

$$ J(W,b)=\frac{1}{2m} \sum_{i=1}^{m}(\hat{y}^{(i)} - y^{(i)})^2 $$

Let's consider one particular prediction $$\hat{y}^{(i)}$$ Intuitively, nudging it will only affect the squared error for that example $$i$$ and indeed taking the partial derivative:

$$ \frac{\partial{J}}{\partial{\hat{y}^{(i)}}} =\frac{1}{m}(\hat{y}^{(i)} - y^{(i)}) $$ (note the factor of $$\frac{1}{2}$$ in J has cancelled to leave $$\frac{1}{m}$$.)

For this $$i^{th}$$ example let's consider the effect of nudging a particular weight $$W_j$$ - intuitively since it is multiplied by $$x^{(i)}_j$$ in the calculation, the corresponding amount $$\hat{y}^{(i)}$$ will move is $$x^{(i)}_j$$ times that nudge. And since the bias $$b$$ isn't multiplied by anything, the nudge should be of the same magnitude. Indeed the maths reflects this:

$$ \frac{\partial{\hat{y}^{(i)}}}{\partial{W_j}} = x^{(i)}_j $$

$$ \frac{\partial{\hat{y}^{(i)}}}{\partial{b}} = 1$$

Now we've looked at the partial derivative intuition, let's look at computing the chain rule. If we nudge $$W_j$$ or $$b$$ intuitively we will affect all predictions, so therefore we need to sum across the examples $$i$$. So we have that:

$$\frac{\partial{J}}{\partial{W_j}} = \sum_{i=1}^{m}\frac{\partial{J}}{\partial{\hat{y}^{(i)}}}*\frac{\partial{\hat{y}^{(i)}}}{\partial{W_j}} = \frac{1}{m} \sum_{i=1}^{m}(\hat{y}^{(i)} - y^{(i)})*x^{(i)}_j $$

and:

$$\frac{\partial{J}}{\partial{b}} = \sum_{i=1}^{m}\frac{\partial{J}}{\partial{\hat{y}^{(i)}}}*\frac{\partial{\hat{y}^{(i)}}}{\partial{b}} = \frac{1}{m} \sum_{i=1}^{m}(\hat{y}^{(i)} - y^{(i)})$$

Now we can move onto the case of logistic regression - we'll introduce an intermediate step $$z^{(i)}$$:

$$ J(W,b)=\frac{-1}{m} \sum_{i=1}^{m}y^{(i)}\log\hat{y}^{(i)} + (1-y^{(i)})\log(1-\hat{y}^{(i)})$$

$$ \hat{y}^{(i)} = \sigma(z^{(i)}) = \frac{1}{1+e^{-z^{(i)}}}$$

$$ z^{(i)} = \sum_{j=1}^{n} W_jx^{(i)}_j + b $$

Again, nudging $$\hat{y}^{(i)}$$ will only affect the error for that example $$i$$:

$$ \frac{\partial{J}}{\partial{\hat{y}^{(i)}}} =\frac{-1}{m}(\frac{y^{(i)}}{\hat{y}^{(i)}} - \frac{1- y^{(i)}}{1- \hat{y}^{(i)}})$$

The derivative of $$\hat{y}^{(i)}$$ with respect to $$z^{(i)}$$ can be rearranged:

$$\frac{d\hat{y}^{(i)}}{dz^{(i)}} = \frac{e^{-z^{(i)}}}{(1+e^{-z^{(i)}})^2} = \frac{1}{1+e^{-z^{(i)}}}(\frac{e^{-z^{(i)}}+1}{1+e^{-z^{(i)}}}-\frac{1}{1+e^{-z^{(i)}}}) = \sigma(z^{(i)})(1-\sigma(z^{(i)})) =\hat{y}^{(i)}(1-\hat{y}^{(i)}) $$

This is a neat result to remember: $$\sigma'(x) = \sigma(x)(1-\sigma(x))$$

Great, after that algebraic rearrangement, we have a nice result, so let's compute chain rule - note a nudge in $$z^{(i)}$$ only affects $$\hat{y}^{(i)}$$ so:

$$ \frac{\partial{J}}{\partial{z^{(i)}}} = \frac{\partial{J}}{\partial{\hat{y}^{(i)}}}*\frac{d\hat{y}^{(i)}}{dz^{(i)}} = \frac{-1}{m}(\frac{y^{(i)}}{\hat{y}^{(i)}} - \frac{1- y^{(i)}}{1- \hat{y}^{(i)}})\hat{y}^{(i)}(1-\hat{y}^{(i)})$$

So we have, multiplying out:

$$ \frac{\partial{J}}{\partial{z^{(i)}}} = \frac{-1}{m}[ y^{(i)}(1- \hat{y}^{(i)}) - \hat{y}^{(i)}(1- y^{(i)}) ] = \frac{1}{m}(\hat{y}^{(i)} - y^{(i)}) $$

If we compare with linear regression, it turns out that the equations for the partial derivatives for $$W_j$$ and $$b$$ are the same, since the equation for $$z^{(i)}$$ in logistic regression is the same as $$\hat{y}^{(i)}$$ in linear regression.

We just have one final step to finish things off! Just like in the last post, we can rewrite the equation for $$\frac{\partial{J}}{\partial{W}}$$ as a matrix multiplication: note that $$W$$ is a _1_ x _n_ matrix, $$X$$ is a _m_ x _n_ matrix and $$Y$$ is a _1_ x _m_ matrix. So:

$$ \frac{\partial{J}}{\partial{W_1j}} = \frac{1}{m}\sum_{i=1}^{m}(\hat{Y} - Y)_{1i} * X_{ji} = \frac{1}{m}\sum_{i=1}^{m}(\hat{Y} - Y)_{1i} * X^T_{ij}$$

$$ \frac{\partial{J}}{\partial{W}} = \frac{1}{m}(\hat{Y} - Y).X^T$$

The equation for the $$\frac{\partial{J}}{\partial{b}}$$ is the same, only that we use subscripts for the matrix $$Y_{1i}$$ instead of $$y^{(i)}$$ and ditto for $$\hat{Y}$$.

So by breaking it down into many small steps, we have our final equations (for both linear and logistic regression):

$$ \frac{\partial{J}}{\partial{W}} = \frac{1}{m}(\hat{Y} - Y).X^T$$

$$\frac{\partial{J}}{\partial{b}} = \frac{1}{m} \sum_{i=1}^{m}(\hat{Y}_{1i} -Y_{1i})$$

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

With the last two posts, you have now coded up your first two machine learning algorithms, and trained them! Machine learning can be applied to diverse datasets - the motivating examples that you trained your algorithms - housing prices and breast cancer classification - being two great examples of that!

If you made it through the maths, you've understood the fundamentals of most learning algorithms - we'll use this as building blocks for neural networks next.
