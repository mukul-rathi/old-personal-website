---
title: DDemystifying Deep Learning Part 3 - Learning Through Gradient Descent
layout: default
---

Having looked at linear and logistic regression, we will look at how these algorithms "learn". 

### Loss Functions: 

For a machine algorithm to learn, it needs some way of evaluating its performance. The loss function is a function that quantifies the errors in its predictions - lower error is better. Thus, a way for the algorithm to improve is to minimise this loss function, which, if chosen correctly, will also result in the model learning. The algorithm can tweak its weights and biases to get the value of the loss function as low as possible. When thinking of the correct loss function to use, it helps to think about the problem we are trying to solve:

**Intuition:** 
For linear regression, we want to plot a straight line of best fit - i.e one that is as close to as many of the points as possible. So one good idea is to minimise the mean distance between the straight line and the points. So we take the difference between the prediction and the actual value, then square it (so it ensures the value is always positive), and then do this for all predictions and take the mean.
 
 **Maths:**
$$ J(W,b) = \frac{1}{2m} \sum_{i=1}^{m} (y^{(i)}_{pred} - y^{(i)})^2 $$
Breaking down the notation:

* \(J(W,b)\) is the loss function - its parameters are the weights and biases - by adjusting these, the model reduces the loss function.

* There are \(m\) training examples and the \(i^{th}\) training example is denoted by the pair \((x^{(i)},y^{(i)})\), the corresponding prediction given \(x^{(i)}\) is \(y^{(i)}_{pred}\)

 **Code:**
<!--TODO: INSERT CODE HERE-->

Next, moving onto logistic regression:

**Intuition:** The aim with logistic regression is to maximise the probability of getting the correct label across all the examples.

 **Maths:** 
Here, it is easier to present the intuition interspersed with the maths:

For a single example, we want:
$$ \operatorname*{argmax}_{W,b} P(y|x;W,b) $$
This translates to finding \(W, b\) that maximise the probability of getting the correct label \(y\) given the value of \(x\), parameterised by \(W, b\). Since each training example is independent of each other, to get the total probability we multiply the probabilities together:
$$  \operatorname*{argmax}_{W,b} \prod_{i=1}^{m} P(y^{(i)}|x^{(i)};W,b) $$
This could lead to underflow, when multiplying tiny probabilities together, so instead we take the log and maximise that. Since \(\log{(xy)}=\log{x+\log{y}}\) we now have:
$$  \operatorname*{argmax}_{W,b} \sum_{i=1}^{m} \log{P(y^{(i)}|x^{(i)};W,b)}$$
If we recall our interpretation of the output of logistic regression, we have that:
$$ P(y=1|x;W,b) = y_{pred}$$
$$ P(y=0|x;W,b) = 1 - y_{pred}$$
Putting all these pieces together, it is time to look at the loss function for logistic regression:
$$ J(W,b) = \frac{-1}{m} \sum_{i=1}^{m} y^{(i)} \log(y^{(i)}_{pred}) + (1-y^{(i)}) \log(1-y^{(i)}_{pred})$$
Breaking it down:
* First, we have a negative sign in front of the entire expression: this is because we want to maximise the log probability, but we can only minimise the loss function.
* We divide the sum by \(m\) - this corresponds to the "mean" probability, and since \(m\) is the same for all \(W,b\) it doesn't affect our objective.
* There are two terms in the summation: the first is \(\log{P(y=1|x;W,b)}\) and the second is \(\log{P(y=0|x;W,b)}\). These combine to give \(\log{P(y|x;W,b)}\) since when \(y=0\) only the second term contributes, and likewise when \(y=1\) only the first term contributes, since the \(y^{(i)}\) and \(1 - y^{(i)}\) terms set the other to zero respectively.

 **Code:**
<!--TODO: INSERT CODE HERE-->


So now that we have defined our loss function, let's look at how we minimise it:
### Gradient Descent: 
<!--INSERT IMAGE OF GRADIENT DESCENT HILL-->
**Intuition:** 
    
Think of the loss function as a surface with hills and valleys, and the current value of the loss for the algorithm as a point on this surface. We want to minimise it, so we want to keep taking steps down the slope of the surface into the valley.


The slope of the surface is the gradient at that point, and so we want to keep taking steps in the direction down the gradient to the minimum, where the gradient is 0. This is the gradient descent algorithm.

**Maths:** 

The gradient descent update equation is as follows:
$$ W= W - \alpha \frac{\partial \mathcal{J} }{\partial W} $$
$$ b = b - \alpha \frac{\partial \mathcal{J} }{\partial b} $$
The gradient with respect to a parameter is given by the partial derivative of the loss function. \(\alpha\) is the learning rate <em>hyperparameter</em> - this controls the size of the step we take each iteration. If  \(\alpha\) is too large we may overshoot the minimum and diverge, whereas if  \(\alpha\) is too small it will take too long to converge to the minimum.

To derive the partial derivatives, we will need a few bits of prerequisite knowledge:

* The chain rule:  \(\frac{\partial y}{\partial x}  = \frac{\partial y}{\partial u}\frac{\partial u}{\partial x}\)

* Matrix multiplication in terms of suffixes: 
If \(C = AB\) then \(C_{ij}=\sum_{k}A_{ik}B_{kj}\)

 
<!--TODO: type up the equations in LaTeX-->

### Conclusion: 

With the last two posts, you have now coded up your first two machine learning algorithms, and trained them! If you want to see the full code, head to the <a href="https://github.com/mukul-rathi/blogPost-tutorials">GitHub repo.</a>
