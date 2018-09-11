---
series: Demystifying Deep Learning 
part: Part 9
title: Backpropagation in a Convolutional Neural Network
layout: default
comments: true
date:  2018-09-10 07:00:00
excerpt: How CNNs learn
image: "/assets/blog/CNNBackprop/cnn-internals.png"
caption: Visualising the internal activations of a CNN
---

## Introduction

In this post, we will derive the backprop equations for Convolutional Neural Networks. 

In a feedforward neural network, we only had one type of layer (fully-connected layer) to consider, however in a CNN we need to consider each type of layer separately.

The different layers to consider are: 
* Convolution Layer
* ReLU Layer
* Pooling Layer
* Fully-Connected Layer
* Softmax (Output) Layer 

## ReLU Layer

Recall that $$ReLU(x) = max(x,0)$$. When $$x>0$$ this returns $$x$$ so this is linear in this region of the function (gradient is 1), and when $$x<0$$ this is always 0 (so a constant value), so gradient is 0. NB the gradient at exactly 0 is technically *undefined* but in practice we just set it to zero.

### Code:
```python


    def relu(z, deriv = False):
            if(deriv): #this is for the partial derivatives (discussed in next blog post)
                return z>0 #Note that True=1 and False=0 when converted to float
            else:
                return np.multiply(z, z>0)

```


## Pooling Layer

For the pooling layer, we do not need to explicitly compute partial derivatives, since there are *no parameters*. Instead we are concerned with how to distribute the gradient to each of the values in the corresponding input 2x2 patch. 

there are two options: 
* Max Pooling
* Average Pooling

**Max Pooling:** 

Intuitively a nudge in the non-max values of each 2x2 patch will not affect the output, since the output is only concerned about the max value in the patch. Therefore the non-max values have a gradient of 0. 

For the max value in each patch, since the output is just that value, a nudge in the max value will have a corresponding magnitude nudge in the output - so the gradient is 1. 

So effectively, we are just routing the gradient through only the max value of that corresponding input patch.

**Average Pooling**: 

Here for a given 2x2 patch $$X$$ the output $$Z$$ is given by the mean of the values i.e:

$$ Z = \frac{X_{11}+X_{12} + X_{21} + X_{22}}{4} $$ 

Thus a nudge in any of these values in the patch will have a output nudge that is only a quarter of the magnitude - i.e. the gradient here is 0.25 for all values across the image. 

Intuitively think of this as *sharing* the gradient equally between the values in the patch.


### Code: 
It is worth bringing up the code from the **forward pass**, to detail how the mask, which is used to allocate gradients, is created. 

**Max Pooling**:

We use **np.repeat()** to copy one ouput value across the corresponding 2x2 patch (i.e. we double the width/height of the output) - so it has the same dimensionality as the input. 

To get the position of the max element in the patch, rather than doing an argmax, a simple trick is to elementwise compare the input with the scaled up output, since the output is only equal to the max value of the patch. 

One subtlety with floating point multiplication is that we can get floating point rounding errors, so we use **np.isclose()** rather than **np.equal()** to have a tolerance for this error. 

We then convert the mask to int type explicitly, to be used in the backward pass - so it zeros the gradient for the non-max values. 

**Average Pooling**: 

Here the gradient is just 0.25 for all values, so we create a mask matrix of the same dimensionality of all 0.25s. 

For the **backward pass**, we scale the gradient matrix up by copying the value of the gradient for each patch to all values in that 2x2 patch, then we allocate gradients by applying the pre-computed mask in the forward pass. 

```python

    def pool_forward(x,mode="max"):
        x_patches = x.reshape(x.shape[0],x.shape[1]//2, 2,x.shape[2]//2, 2,x.shape[3])
        if mode=="max":
            out = x_patches.max(axis=2).max(axis=3)
            mask  =np.isclose(x,np.repeat(np.repeat(out,2,axis=1),2,axis=2)).astype(int)
        elif mode=="average": 
            out =  x_patches.mean(axis=3).mean(axis=4)
            mask = np.ones_like(x)*0.25
        return out,mask

    #backward calculation 
    def pool_backward(dx, mask):
        return mask*(np.repeat(np.repeat(dx,2,axis=1),2,axis=2))

```


## Fully-Connected Layer

The fully-connected layer is identical to that used in the feedforward neural network, so we will skip the derivation (see original backprop post) and just list the equations below. 

$$  \frac{\partial{J}}{\partial{W^{[l]}_{jk}}}=  \frac{1}{m} \frac{\partial{J}}{\partial{Z^{[l]}}}.A^{[l-1]T} $$

$$\frac{\partial{J}}{\partial{b^{[l]}}} = \frac{1}{m} \sum_{i=1}^{m}\frac{\partial{J}}{\partial{Z^{[l](i)}}} $$

$$\frac{\partial{J}}{\partial{A^{[l-1]}}} = W^{[l]T}.\frac{\partial{J}}{\partial{z^{[l]}}}$$

The code is the same as the feedforward network layer, so again we'll just list it below:

```python

    def fc_backward(dA,a,x,w,b):
        m = dA.shape[1]
        dZ = dA*relu(a,deriv=True)
        dW = (1/m)*dZ.dot(x.T)
        db = (1/m)*np.sum(dZ,axis=1,keepdims=True)
        dx =  np.dot(w.T,dZ)
        return dx, dW,db

```

## Softmax Layer:

The equation we are concerned with computing is: 

$$\frac{\partial{J}}{\partial{Z^{[l]}}} = \frac{\partial{J}}{\partial{A^{[l]}}}*g'(Z^{[L]})$$

The rest of the equations for the output layer are identical to the fully-connected layer, since the softmax layer only differs in activation function.

Recall that the cost function is the cross-entropy cost function:

$$ J(W,b) = \frac{-1}{m} \sum_{i=1}^{m} \sum_{k} y^{(i)}_k \log(\hat{y}^{(i)}_k)$$

Again, we can consider a single output layer node - so consider the node corresponding to the $$i^{th}$$ training example and the $$j^{th}$$ class, $${a}^{(i)[L]}_j = \hat{y}^{(i)}_j$$.

$$ \frac{\partial{J}}{\partial{\hat{y}^{(i)}_j}} =\frac{-y^{(i)}_j}{\hat{y}^{(i)}_j}$$

Next we consider the effect of nudging the weighted input of tehe output code corresponding to the $$i^{th}$$ training example and the $$j^{th}$$ class, $${z}^{(i)[L]}_j $$.

Recall the equation for the softmax layer: 

$$ softmax(z^{(i)[L]}_j) = \frac{e^{z^{(i)[L]}_j}}{\sum_k e^{z^{(i)[L]}_k}} $$

Clearly a nudge in $${z}^{(i)[L]}_j $$ will affect the value of the corresponding output node $${a}^{(i)[L]}_j$$ since we exponentiate $${z}^{(i)[L]}_j $$ in the numerator. 

However, there is another *subtletly*. Since the nudge affects the value $$e^{z^{(i)[L]}_j}$$, it will affect the sum of the exponentiated values, so it will affect the outputs of **all** of the ouput nodes, since the denominator of all nodes is the aforementioned sum of the exponentiated values. 

Let's consider the two cases separately. 

First, let's compute the derivative of the output of the corresponding output $${a}^{(i)[L]}_j$$ with respect to $${z}^{(i)[L]}_j $$- we use quotient rule since both the numerator and denominator are dependent on  $${z}^{(i)[L]}_j $$.

$$\frac{\partial{a^{(i)[L]}_j}}{\partial{z^{(i)[L]}_j}}  = \frac{e^{z^{(i)[L]}_j}}{\sum_k e^{z^{(i)[L]}_k}}  - (\frac{e^{z^{(i)[L]}_j}}{\sum_k e^{z^{(i)[L]}_k}})^2 = \hat{y}^{(i)}_j(1 - \hat{y}^{(i)}_j)$$

Next, consider the derivative of a different node $${a}^{(i)[L]}_m$$ with respect to $${z}^{(i)[L]}_j $$. Here the numerator doesn't depend on $${z}^{(i)[L]}_j $$ since we have exponentiated a different node $${z}^{(i)[L]}_m$$.

So the derivative is just: 

$$\frac{\partial{a^{(i)[L]}_m}}{\partial{z^{(i)[L]}_j}}  =  - \frac{e^{z^{(i)[L]}_j}e^{z^{(i)[L]}_m}}{({\sum_k e^{z^{(i)[L]}_k}})^2} = - \hat{y}^{(i)}_j*\hat{y}^{(i)}_m$$

Since $$a^{(i)[L]}_m = \hat{y}^{(i)}_m $$, and a nudge in $$z^{(i)[L]}_j $$ affects all output nodes, we sum partial derivatives across nodes, so using chain rule we have: 

$$ \frac{\partial{J}}{\partial{z^{(i)[L]}_j}} =  \sum_k \frac{\partial{J}}{\partial{\hat{y}^{(i)}_k}}*\frac{\partial{\hat{y}^{(i)}_k}}{\partial{z^{(i)[L]}_j}}$$

Again, we split into the two cases: 

$$ \frac{\partial{J}}{\partial{z^{(i)[L]}_j}} = \frac{\partial{J}}{\partial{\hat{y}^{(i)}_j}}*\frac{\partial{\hat{y}^{(i)}_j}}{\partial{z^{(i)[L]}_j}}+  \sum_{k \neq j} \frac{\partial{J}}{\partial{\hat{y}^{(i)}_k}}*\frac{\partial{\hat{y}^{(i)}_k}}{\partial{z^{(i)[L]}_j}}$$

$$ \frac{\partial{J}}{\partial{z^{(i)[L]}_j}} = \frac{-y^{(i)}_j}{\hat{y}^{(i)}_j} * \hat{y}^{(i)}_j(1 - \hat{y}^{(i)}_j) +  \sum_{k \neq j} \frac{-y^{(i)}_k}{\hat{y}^{(i)}_k} *- \hat{y}^{(i)}_j*\hat{y}^{(i)}_k$$

Tidying up and combining the $$j$$ term with the $$ \sum_{k \neq j}$$ term to get $$ \sum_k $$:

$$ \frac{\partial{J}}{\partial{z^{(i)[L]}_j}} = -y^{(i)}_j + \hat{y}^{(i)}_j*\sum_k y^{(i)}_k$$

Since the probabilities of $$y$$ across the output nodes sum to 1, this reduces our equation to:

$$ \frac{\partial{J}}{\partial{z^{(i)[L]}_j}} = \hat{y}^{(i)}_j-y^{(i)}_j $$

So **wrapping up**, having considered the equation for one neuron, we can generalise across the matrix $$Z^{[L]}$$ to get: 

$$\frac{\partial{J}}{\partial{Z^{[l]}}} = \hat{Y} - Y $$

