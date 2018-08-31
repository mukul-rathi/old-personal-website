---
series: Demystifying Deep Learning 
part: Part 5
title: Backpropagation
layout: default
comments: true
date:   2018-08-30 13:00:00
excerpt: The magic sauce behind neural networks - how they learn!
---

This may be the **most important** post in the series, and also the most overlooked, both for the same reason - this is where the maths gets *interesting*! It is important to get to grips with it when looking at deep learning algorithms - although later you may never have to implement it manually,thanks to the power of deep learning frameworks, understanding it is *crucial* when debugging your model.


Don't fret though, the principles we applied in the [Learning by Gradient Descent]() post will help us a great deal to really *understand* this.

But before we dive into the maths, it makes sense to describe what the backpropagation algorithm is.

**Backpropagation** is an algorithm for computing the *partial derivatives* of the parameters, by going through the network backwards, layer by layer, starting from the output layer. 

## Why backpropagation to learn the weights?

It first makes sense to understand why we use backprop to compute derivatives in the first place. Aren't there better alternatives?

What about numerically approximating the gradient by seeing how much the cost changes directly when we nudge each parameter? Well, there are often tens of thousands, if not more parameters, and computing cost using forward prop for all of them is *very* expensive.

So we'll have to analytically compute our partial derivative through the chain rule.

If we were to go through the network forwards, and consider the weights from the first layer, we'd have to consider how a nudge affects the immediate outputs - i.e. the 2nd layer, and then how that nudge in the 2nd layer propagates to the 3rd layer etc. For the 2nd layer we'd have to recompute all the later layer calculations, which is expensive since the later layers' partial derivatives are used again. And again, for the weights in the 3rd layer, and so on. 

To put the maths formally:

$$ \frac{\partial{J}}{\partial{W^{[1]}}} = \frac{\partial{A^{[1]}}}{\partial{W^{[1]}}}*\frac{\partial{A^{[2]}}}{\partial{A^{[1]}}}*[\frac{\partial{A^{[3]}}}{\partial{A^{[2]}}}...\frac{\partial{A^{[L]}}}{\partial{A^{[L-1]}}}*\frac{\partial{J}}{\partial{A^{[L]}}}]$$

$$ \frac{\partial{J}}{\partial{W^{[2]}}} = \frac{\partial{A^{[2]}}}{\partial{W^{[2]}}}*[\frac{\partial{A^{[3]}}}{\partial{A^{[2]}}}...\frac{\partial{A^{[L]}}}{\partial{A^{[L-1]}}}*\frac{\partial{J}}{\partial{A^{[L]}}}]$$

Notice how the term in square brackets (the ripple effect of the "nudges" from the 3rd layer onwards) is the same for both equations. 
So what if we computed the term *first*, then computed the weights for the first and second layer?

More generally, when computing the weights in layers $$1...l $$ we'll be reusing the same computations involving partial derivatives from layer $$l+1$$ onwards. 

So it makes sense to start from the output, and make one pass backward, computing the partial derivatives layer by layer - each layer's calculations being reused in subsequent calculations, such that we don't compute anything twice. 

*Aside:* Linking this to other areas of computer science as a way of looking at the underlying principles, this is an example of the more general principle of **bottom-up dynamic programming**.



## Deriving the Backpropagation Algorithm

When deriving the algorithm's equations, we will intersperse the intuition with the maths. 

It is helpful to restate the tips given in the [Learning by Gradient Descent]() post:
* *Partial Derivative Intuition*: Think of $$\frac{\partial{y}}{\partial{x}} $$ loosely as quantifying how much $$y$$ would change if you gave the value of $$x$$ a little "nudge" at that point.
* *Breaking down computations* - we can use the **chain rule** to aid us in our computation - rather than trying to compute the derivative in one fell swoop, we break up the computation into smaller intermediate steps.
* *Computing the chain rule* - when thinking about which intermediate values to include in our chain rule expression, think about the immediate outputs of equations involving $$x$$ - which other values get directly affected when I slightly nudge $$x$$?
* *One element at a time* - rather than worrying about the entire matrix $$A$$, we'll instead look at an element $$A_{ij}$$. One equation we will refer to time and time again is:

     $$C_{ij} = \sum_k A_{ik}B_{kj} \iff  C=A.B$$

    A useful tip when trying to go from one element to a matrix is to look for summations over repeated indices (here it was k) - this suggests a matrix multiplication.

    Another useful equation is the element-wise product of two matrices:

    $$C_{ij} = A_{ij}B_{ij} \iff  C=A*B$$ 
* *Sanity dimensions check* - check the dimensions of the matrices all match (the derivative matrix should have same dimensions as the original matrix, and all matrices being multiplied together should have dimensions that align.

### Backpropagating through layer l:

Let's break the backprop into a smaller computation, that of one particular layer $$l$$. Let's assume we have computed  $$\frac{\partial{J}}{\partial{A^{[l]}}}$$ - in the overall algorithm this gets propagated back from layer $$l+1$$.

We need to compute the relative partial derivatives for this layer so it makes sense to remind ourselves of the equations from the forward pass:

$$ Z^{[l]} =  W^{[l]}.A^{[l-1]} + b^{[l]} $$

$$A^{[l]} = g(Z^{[l]})$$

First let's consider how to compute $$\frac{\partial{J}}{\partial{Z^{[l]}}}$$. Consider a single element $$Z^{[l]}_{ij}$$ - since we are applying the activation function $$g(x)$$ individually to each element in the matrix, a nudge in $$Z^{[l]}_{ij}$$ will only affect the corresponding activated output - $$A^{[l]}_{ij}$$. The magnitude of the nudge of $$A_{ij}$$ is by definition the derivative of the function $$g(x)$$ at the value of $$Z_{ij}$$.
So we have:

$$ \frac{dA^{[l]}_{ij}}{dZ^{[l]}_{ij}} = g'(Z^{[l]}_{ij}) $$ 

We can apply the chain rule:

$$\frac{\partial{J}}{\partial{Z^{[l]}_{ij}}} = \frac{\partial{J}}{\partial{A^{[l]}}}*     \frac{dA^{[l]}
_{ij}}{dZ^{[l]}
_{ij}} = \frac{\partial{J}}{\partial{A^{[l]}_{ij}}}   *    g'(Z^{[l]}_{ij})$$

This is just an element-wise product of two matrices - since we are multiplying the corresponding indices $$_{ij}$$ of both matrices together. So we have our equation:

 $$\frac{\partial{J}}{\partial{Z^{[l]}}} = \frac{\partial{J}}{\partial{A^{[l]}}}*g'(Z^{[L]})$$

As a sanity check, $$ \frac{\partial{J}}{\partial{A^{[l]}}} $$ has the same dimensions as $$ A^{[l]}$$ which has dimensions $$n_l$$ x $$m$$, which is the same as $$g'(Z^{[L]})$$ since it is applying a function element-wise so preserves dimensions of $$Z^{[L]}$$. So the dimensions of  $$ \frac{\partial{J}}{\partial{Z^{[l]}}} $$ do match with $$Z^{[L]}$$.

Brilliant! Next, let's look at the effect of nudging the weight $$W^[l]_ij$$






Now having looked at the general layer case, let's look at the final layer of the network. Potential final layer activations are:
* no activation - for a regression task
* sigmoid - for binary classification
* softmax - for multi-class classification

For regression and binary classification, as we showed before -
    $$ \frac{\partial{J}}{\partial{Z^{[L]}}} = \hat{Y} - Y $$

It turns out that with softmax for multi-class classification that the same equation holds. As mentioned in the previous post, we will look at the softmax derivation later in the series, when we look at multi-class classification.



## Conclusion

Let's take a step backward here and just appreciate the **beauty** of backpropagation. What appeared to us as initially a complicated and scary expression for the partial derivatives has been broken down to a layer by layer calculation.