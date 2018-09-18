---
series: Demystifying Deep Learning 
part: Part 11
title: Backpropagation through, well, anything! 
layout: default
comments: true
date:  2018-09-17 10:00:00
excerpt: How we can generalise Backprop to <em> any </em> neural network - see how TensorFlow and Keras compute their partial derivatives! We'll use the LSTM cell as an example
image: /assets/blog/BackpropAnything/LSTM.png

caption: The LSTM cell computation graph (note it uses  <strong> h </strong> where we refer to the activation as  <strong> a </strong> )
---

## Introduction 

So far in this series, we have looked at the general principle of gradient descent, and how we computed backpropagation for each layer in a feedforward neural network, then generalising to look at backprop in different types of layers in a CNN. 

Now we will take a step back and look at backpropagation in a more general sense - *through a computation graph*. Through this we'll get a general intuition for how the frameworks compute their 

We'll use the LSTM cell as an example. 


## General Backpropagation Principles

Let's look back at the principles we've used in this series:

* *Partial Derivative Intuition*: Think of $$\frac{\partial{y}}{\partial{x}} $$ loosely as quantifying how much $$y$$ would change if you gave the value of $$x$$ a little "nudge" at that point. 
* *Breaking down computations* - we can use the **chain rule** to aid us in our computation - rather than trying to compute the derivative in one fell swoop, we break up the computation into smaller **intermediate** steps.
* *Computing the chain rule* - when thinking about which intermediate values to include in our chain rule expression, think about the immediate outputs of equations involving $$x$$ - which other values get directly affected when we slightly nudge $$x$$?
* *One element at a time* - rather than worrying about the entire matrix $$A$$, we'll instead look at an element $$A_{ij}$$. One equation we will refer to time and time again is:

     $$C_{ij} = \sum_k A_{ik}B_{kj} \iff  C=A.B$$

    A useful tip when trying to go from one element to a matrix is to look for summations over repeated indices (here it was k) - this suggests a matrix multiplication.

    Another useful equation is the element-wise product of two matrices:

    $$C_{ij} = A_{ij}B_{ij} \iff  C=A*B$$ 
* *Sanity check the dimensions* - check the dimensions of the matrices all match (the derivative matrix should have same dimensions as the original matrix, and all matrices being multiplied together should have dimensions that align.

A **computation graph** allows us to clearly break down the computations, as well as see the immediate outputs when computing our chain rule. 

We will use the computation graph representation *(shown above*) of the LSTM to compute the gradients using backpropagation through time. 

## The LSTM Computation Graph 

### Forward Propagation equations

From the previous post, the forward propagation equations  for one timestep in the LSTM are:

$$ \Gamma_i = \sigma(W_i [a^{<t-1>}, x^{<t>}]+b_i)$$

$$ \Gamma_f = \sigma(W_f [a^{<t-1>}, x^{<t>}]+b_f)$$

$$ \Gamma_o = \sigma(W_o [a^{<t-1>}, x^{<t>}]+b_o)$$

$$ \tilde{c}^{<t>} =\tanh (W_c [a^{<t-1>}, x^{<t>}]+b_c) $$

$$  {c}^{<t>} = \Gamma_i*\tilde{c}^{<t>} + \Gamma_f*{c}^{<t-1>}$$

$$ a^{<t>} = \Gamma_o*\tanh{c}^{<t>}$$

To backpropagate through the cell, given the gradient with respect to $$a^{<t>}$$ and  $$c^{<t>}$$ from the backprop from the next step, we need to compute the gradients for each of the weights $$W_i, W_f, W_o, W_c $$ and biases $$b_i, b_f, b_o, b_c $$, and finally we will need to backpropagate to the previous timestep and compute the gradient with respect to $$a^{<t-1>}$$ and  $$c^{<t-1>}$$.

These are a *lot* of partial derivatives to compute - indeed as our neural networks get more complicated there will be more partial derivatives to calculate. 

### How can we use our computation graph to break this down?

Firstly, since the gate equations are identical, we can combine them so instead we have a $$3n_a$$ x $$m$$ matrix $$\Gamma$$ containing the 3 gates' outputs, and we can refer to the first third of the matrix $$\Gamma_i$$ and the other two thirds $$\Gamma_f$$ and $$\Gamma_o$$ respectively. Then we have one  $$3n_a$$ x $$(n_a + n_x)$$ matrix of weights for the gates $$W_g$$ and one  $$3n_a$$ x $$1$$ bias vector $$b_g$$.

Next, we want to document all intermediate stages in calculation (every node in the graph). 

So, walking through the computation graph node-by-node in the forward step: 

* We concatenate $$a^{<t-1>}$$ and $$x^{<t>}$$ to form the  $$(n_a + n_x)$$  x $$m$$ concatenated input matrix $$[a^{<t-1>}, x^{<t>}]$$.

* We calculate the weighted input matrix for the gates $$Z_g$$ using the weights $$W_g$$ and bias $$b_g$$. 

* Likewise we calculate the weighted input $$Z_c$$ for the  candidate memory $$\tilde{c}^{<t>}$$  using the weight matrix $$W_c$$ and bias $$b_c$$.

(*NB:* the diagram uses one weight matrix W, but it helps to think about these weights separately because of the different activation functions used)

* We apply the sigmoid activation function to $$Z_g$$ to get the Gate matrix $$\Gamma$$ (denoted by __f__, __i__, __o__ in diagram), and the tanh activation function to $$Z_c$$ to get $$\tilde{c}^{<t>}$$ (denoted by __g__ in the diagram).

* Since elementwise multiplication and addition are straightforward operations, for brevity we won't give the intermediate outputs $$\Gamma_i*\tilde{c}^{<t>}$$ and $$ \Gamma_f*{c}^{<t-1>}$$ their own symbols. 

* Let us denote the $$\tanh{c}^{<t>}$$ intermediate output as $$\tilde{a}^{<t>}$$.

Now we have broken down the computation graph into steps, and added our intermediate variables we have the equations:

$$ Z_g = W_g.[a^{<t-1>}, x^{<t>}]+b_g$$ 

$$ Z_c = W_c.[a^{<t-1>}, x^{<t>}]+b_c$$ 

$$ \Gamma = \sigma(Z_g)$$

$$ \tilde{c}^{<t>} =\tanh (Z_c) $$

$$  {c}^{<t>} = \Gamma_i*\tilde{c}^{<t>} + \Gamma_f*{c}^{<t-1>}$$

$$\tilde{a}^{<t>} = \tanh{c}^{<t>}$$

$$ a^{<t>} = \Gamma_o*\tilde{a}^{<t>}$$

These equations correspond to the nodes in the graph - the left-hand-side variable is the ouput edge of the node, and the right-hand-side variables are the input edges to the node. 

## Backpropagation in a Computation Graph: 

These equations allow us to clearly see the immediate outputs with respect to a variable when computing the chain rule - *e.g. for $$[a^{<t-1>}, x^{<t>}]$$ the immediate outputs are $$Z_g$$ and $$Z_c$$*. 

If we look at the equations / computation graph, we can more generally look at the type of operations, and then use the same identities:

* **Addition**:  If $$ C = A + B$$ then $$\frac{\partial{C}}{\partial{A}} = 1 $$ and $$\frac{\partial{C}}{\partial{B}} = 1 $$

* **Elementwise multiplication**: 
    If $$ C = A * B$$ then $$\frac{\partial{C}}{\partial{A}} = B $$ and $$\frac{\partial{C}}{\partial{B}} = A $$

* **tanh**: If $$C = \tanh A$$ then $$\frac{\partial{C}}{\partial{A}} = 1 - \tanh^2 A = 1 - C^2 $$

* **sigmoid**: If $$C = \sigma(A)$$ then $$\frac{\partial{C}}{\partial{A}} = \sigma (A)- \sigma^2 (A) = C*(1-C)$$

* **Weighted Input**: this is the same equation as the feedforward neural network. If $$ Z =  W.X + b$$ then:

$$  \frac{\partial{J}}{\partial{W}}=  \frac{1}{m} \frac{\partial{J}}{\partial{Z}}.X^{T} $$

$$\frac{\partial{J}}{\partial{b}} = \frac{1}{m} \sum_{i=1}^{m}\frac{\partial{J}}{\partial{Z}} $$

$$\frac{\partial{J}}{\partial{X}} = W^{T}.\frac{\partial{J}}{\partial{Z}}$$
 

 Armed with these general computation graph principles, we can apply **chain rule**. We elementwise multiply ($$*$$) the partial derivatives, i.e.

$$ \frac{\partial{J}}{\partial{A}} = \frac{\partial{J}}{\partial{B}}*\frac{\partial{B}}{\partial{A}}$$


Also note we sum partial derivatives coming from each of the immediate outputs: 

So if $$ B = f(A)$$
and $$ C = g(A)$$, i.e. $$B$$ and $$C$$ are immediate outputs of $$A$$ in the computation graph, then we sum the partial derivatives:

$$ \frac{\partial{J}}{\partial{A}} = \frac{\partial{J}}{\partial{B}}*\frac{\partial{B}}{\partial{A}} + \frac{\partial{J}}{\partial{C}}*\frac{\partial{C}}{\partial{A}} $$


In a **deep learning framework** like *TensorFlow* or *Keras*, there will be identities like this for each of the differentiable operations.

## Backpropagation Through Time in an LSTM Cell

When trying to compute $$ \frac{\partial{J}}{\partial{A}} $$, we'll use the general equation: 

 $$ \frac{\partial{J}}{\partial{A}} = \frac{\partial{J}}{\partial{B}}*\frac{\partial{B}}{\partial{A}}$$

For brevity, we'll substitute the value of $$\frac{\partial{B}}{\partial{A}}$$ using the operations' identities above. 

The equations are thus as follows:

$$ \frac{\partial{J}}{\partial{\tilde{a}^{<t>}}} = \frac{\partial{J}}{\partial{a^{<t>}}}* \Gamma_o $$

$$ \frac{\partial{J}}{\partial{c^{<t>}}} = \frac{\partial{J}}{\partial{c^{<t+1>}}}*\Gamma_f + \frac{\partial{J}}{\partial{\tilde{a}^{<t>}}} *(1-\tilde{a}^{<t>2})$$

$$ \frac{\partial{J}}{\partial{\tilde{c}^{<t>}}} = \frac{\partial{J}}{\partial{c^{<t>}}}*\Gamma_i $$

$$ \frac{\partial{J}}{\partial{\Gamma_i}}= \frac{\partial{J}}{\partial{c^{<t>}}}*\tilde{c}^{<t>}$$

$$ \frac{\partial{J}}{\partial{\Gamma_f}}= \frac{\partial{J}}{\partial{c^{<t>}}}*c^{<t-1>}$$

$$ \frac{\partial{J}}{\partial{\Gamma_o}}= \frac{\partial{J}}{\partial{a^{<t>}}}*\tilde{a}^{<t>}$$

$$ \frac{\partial{J}}{\partial{Z_g}} = \frac{\partial{J}}{\partial{\Gamma}}*\Gamma*(1-\Gamma)$$

$$ \frac{\partial{J}}{\partial{W_g}} = \frac{1}{m} \frac{\partial{J}}{\partial{Z_g}}.[a^{<t-1>}, x^{<t>}]^T $$

$$ \frac{\partial{J}}{\partial{b_g}} = \frac{1}{m}\sum_{i=1}^{m} \frac{\partial{J}}{\partial{Z_g^{(i)}}} $$


$$ \frac{\partial{J}}{\partial{Z_c}} = \frac{\partial{J}}{\partial{\tilde{c}^{<t>}}}*(1-\tilde{c}^{<t>^2})$$

$$ \frac{\partial{J}}{\partial{W_c}} = \frac{1}{m} \frac{\partial{J}}{\partial{Z_c}}.[a^{<t-1>}, x^{<t>}]^T $$

$$ \frac{\partial{J}}{\partial{b_c}} = \frac{1}{m}\sum_{i=1}^{m} \frac{\partial{J}}{\partial{Z_c^{(i)}}} $$


$$ \frac{\partial{J}}{\partial{[a^{<t-1>}, x^{<t>}]}} =  W_g^T.\frac{\partial{J}}{\partial{Z_g}}+     W_c^T.\frac{\partial{J}}{\partial{Z_c}} $$


## Conclusion

This seems like a good juncture to recap the series so far.

We started the series looking at the most commonly used termninology, followed by looking at simple machine learning algorithms in linear and logistic regression, building up the intuition behind the maths as we built up to a feedforward neural network. 

Next we looked at the learning process itself, and how we could improve gradient descent itself, as well as debug our model to see whether it was learning or not. 

Finally, we moved onto more specialised neural networks - CNNs and recurrent neural nets, not only looking at their theory but the motivation behind them. We also looked at the maths behind them, deriving the backprop equations from scratch. 

Now that we're at the point that we're able to understand backprop in a general computation graph, we can use the abstractions of the deep learning frameworks in subsequent posts.

