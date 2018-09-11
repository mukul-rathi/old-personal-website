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

## Fully-Connected Layer

The fully-connected layer is identical to that used in the feedforward neural network, so we will skip the derivation (see original backprop post) and just list the equations below. 

$$\frac{\partial{J}}{\partial{Z^{[l]}}} = \frac{\partial{J}}{\partial{A^{[l]}}}*g'(Z^{[L]})$$

$$  \frac{\partial{J}}{\partial{W^{[l]}_{jk}}}=  \frac{1}{m} \frac{\partial{J}}{\partial{Z^{[l]}}}.A^{[l-1]T} $$

$$\frac{\partial{J}}{\partial{b^{[l]}}} = \frac{1}{m} \sum_{i=1}^{m}\frac{\partial{J}}{\partial{Z^{[l](i)}}} $$

$$\frac{\partial{J}}{\partial{A^{[l-1]}}} = W^{[l]T}.\frac{\partial{J}}{\partial{z^{[l]}}}$$



