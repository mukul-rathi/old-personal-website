---
title: Demystifying Deep Learning Part 2 - Linear and Logistic Regression
layout: default
comments: true
date:   2018--08-23 10:00:00
excerpt: "Machine Learning!"

---
### Introduction: 

Today, we get our hands dirty with our first machine learning algorithms! Whilst we are starting out simple, these algorithms are still very useful and can be used as a baseline to measure the later machine learning algorithms we cover - to ensure the algorithm is behaving as we expect.

### Intuition: 
<img src="../assets/blog/LinLogRegression/straight-line.png" height=200px width=200px>

Often when we have a set of data points in science, we want to draw a straight line of best fit through the points. *Linear Regression* involves learning this straight line of best fit, only with more dimensions -  instead of axes \(x\) and \(y\), we have axes \(x_1, x_2, ... ,x_n\) and \(y\).


In Linear Regression, we use this straight line of best fit and the values for  \(x_1, x_2, ... ,x_n\), which we call  *input features* to predict the value of the *output* \(y\). This is useful in regression tasks, e.g. housing prices. 

Now instead of a real number output, suppose we wanted to classify this input as one of two classes e.g. fraudulent vs non-fraudulent credit card data. *Logistic Regression* involves taking this output and applying a decision function to this - we end up with a probability - if close to 1 the input is one class, and if closer to 0 the input is the other class. We can think of this probability as the "confidence" the algorithm has.

*Side note:* The name logistic regression is a little confusing as it is a classification algorithm, however this is because the term regression in the context of machine learning differs from regression in statistical maths. For our purposes, we'll use the definition in the first blog. 

### Maths: 
The equation for linear regression extends naturally from the equation of a straight line: 
$$ y= mx + c$$
Just like how m is the gradient of the line, we assign weights to the input features - let \(w_i\) denote the weight corresponding to feature \(x_i\) - you can loosely think of \(w_i\) as the gradient of the line in the direction of the \(x_i\) axis. So the equation for linear regression is: 
$$y = \sum_{i=1}^{n}{w_ix_i} + b $$
For logistic regression, we apply the *sigmoid* function \(\sigma(x)\) to this output - this scales the values to between 0 and 1 (to get the probability): 
<img src="../assets/blog/LinLogRegression/sigmoid.png" height=200px width=200px>
$$ \sigma(x) = \frac{1}{1+e^{-x}}$$ 
$$ y= \sigma(\sum_{i=1}^{n}{w_ix_i} + b) $$
### Code:
We will be writing the code snippets in **Python** and we are using Numpy (a linear algebra library) to carry out the maths operations. 
<pre class="prettyprint">
import numpy as np #we use numpy to do the maths operations

x = np.array([1,1,0,0]) # the input

#initialise weights and bias to random values
# we'll get to training them later in the series
w = np.random.random_sample(x.shape) #same length as x
b = np.random.randn() 

#Linear Regression
y_linear = np.dot(x,w) + b #this performs the vector dot product 

#Logistic Regression
def sigmoid(x): 
return 1.0/(1+np.exp(-x))

y_logistic = sigmoid(y_linear)
</pre>

### Conclusion: 
At this point, you're probably thinking, "Great! But this is just maths, where is the learning?". Hold tight, because in the next blog post we'll be doing just that! We will look at how exact machine learning algorithms even "learn", and how we evaluate their performance.
                    