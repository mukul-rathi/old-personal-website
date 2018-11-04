---
title: OpenMined - Democratising Deep Learning
layout: default
comments: true
date:  2018-11-03 10:00:00
excerpt: The future of deep learning?
image: "/assets/blog/OpenMined/OpenMined-696x449.jpg"
---

## Introduction

Towards the end of this summer, I was looking for a great open-source project to get involved in, when I discovered the incredible community of **OpenMined**!

With my first PR recently merged into the PySyft repository, I thought it would be a good juncture to explain what OpenMined is, illustrated through a [notebook I contributed](https://github.com/OpenMined/PySyft/blob/master/examples/torch/Boston_Housing_Federated_Training%20with%20Secure%20Aggregation%20and%20Diff%20Privacy.ipynb). 


## What is OpenMined?

OpenMined aims to decentralise and democratise AI, to ensure people have control of their own data and that the power of AI isn't concentrated in the hands of large corporations. Data is now a valuable resource, much like oil, so OpenMined aims to create a platform where people retain control and are compensated for the use of their data.

OpenMined has PySyft and Grid.

There are four fundamental tenets of the OpenMined Platform:

* Deep Learning
* Federated Learning
* Homeomorphic Encryption
* Smart Contracts

**Deep Learning** is the current state-of-the-art for many machine learning problems, so typically most models on the platform would be some sort of deep learning model. 

**Smart Contracts**: 
In essence, this involves using the Blockchain ledger to store the machine learning models, ensuring that all updates to a model are transparent, using the proof of work property. There are **data miners**, who each take a model on the ledger and train it on their own data and return the gradients, being paid if these gradients improve the model. 

**Federated Learning**: 
This is when we learn over a distributed dataset - users download the model on their data and send the gradients to the server. 

There are two main issues with this:
* Users can steal the model
* The user data can still be inferred from the gradients

The first problem proves a sticking point for businesses wanting to lease their model out. To solve this we use **homeomorphic encryption** where the model is encrypted before it is sent to the user. 

**Homeomorphic encryption** has the great property that we can apply mathematical operations to the encrypted version of the model and the operations will have the same effect (as if they were run on the decrypted tensors).

So for example A->encrypt -> multiply by 2 -> decrypt -> 2*A

This means we can use the encrypted model as usual for inference and training. Our smart contract ensures that, although the users can't see the model under the hood, the model is legitimate and not just a proxy to store the users' data. (Since the initial spec of the model is public, and all subsequent updates are verified by the *proof of work* property).

The second problem is also an issue as it undermines the core idea behind the platform (that people should have control of their data). To fix this, we want to add noise to the gradients to prevent reverse engineering of the data, but to do so in a way that still ensures these gradients allow the model learns. 
This is the main idea behind the field of **differential privacy**. We can also sum up gradients across multiple owners,so that the individuals' data can't be re-engineered - this is known as **secure aggregation**. The idea is that the users collaborate to produce an aggregate gradient, without revealing to other users what their private gradient was (this is an example of **secure multi-party computation**).

## The demo

Great, so having described the main ideas behind the core tenets of the OpenMined platform, let's look at the aforementioned notebook - this demo combines *federated learning*, *secure aggregation* and *differential privacy* when training a model on the Boston Housing Dataset.

### Deep Learning

PySyft extends the **PyTorch** deep learning framework, adding support for federated learning, by overloading the native PyTorch methods and adding extra functionality using *hooks*.

We create VirtualWorkers Bob and Alice - these simulate having workers on other machines/networks, and we add each other to the list of workers so that we can send models/data to and from each other. 

```python

    import syft
    import syft as sy
    from syft.core import utils
    import torch
    import torch.nn.functional as F
    import json
    import random
    from syft.core.frameworks.torch import utils as torch_utils
    from torch.autograd import Variable
    hook = sy.TorchHook(verbose=False)
    me = hook.local_worker
    bob = sy.VirtualWorker(id="bob",hook=hook, is_client_worker=False)
    alice = sy.VirtualWorker(id="alice",hook=hook, is_client_worker=False)
    me.is_client_worker = False

    compute_nodes = [bob, alice]

    me.add_workers([bob, alice])
    bob.add_workers([me, alice])
    alice.add_workers([me, bob])

```

In real-world usage Bob and Alice would already have their data, but we can simulate this by loading in the dataset from a pickle file and sending this to Bob and Alice using the **.send()** function - demonstrated below - we split the data in half based on batch_idx:

```python 

    remote_dataset = (list(),list())

    for batch_idx, (data,target) in enumerate(train_loader):
        data = Variable(data)
        target = Variable(target.float())
        data.send(compute_nodes[batch_idx % len(compute_nodes)])
        target.send(compute_nodes[batch_idx % len(compute_nodes)])
        remote_dataset[batch_idx % len(compute_nodes)].append((data, target))
    
```

### The model:

The model is a standard PyTorch feedforward neural net, with a couple of extra functions **divide_clip_grads()** and **add_noise_to_grads()** which we'll discuss in depth when we talk about differential privacy in more depth.

```python

    class Net(nn.Module):
        def __init__(self):
            super(Net, self).__init__()
            self.fc1 = nn.Linear(13, 32)
            self.fc2 = nn.Linear(32, 24)
            self.fc3 = nn.Linear(24, 1)

        def forward(self, x):
            x = x.view(-1, 13)
            x = F.relu(self.fc1(x))
            x = F.relu(self.fc2(x))
            x = self.fc3(x)
            return x
        
        def divide_clip_grads(self):
            for key, param in self.named_parameters():
                param.grad /= n_batch
                gradient_clip(param)
                
        def add_noise_to_grads(self):
            for key, param in self.named_parameters():
                noise = 1/LOT_SIZE * gaussian_noise(param.grad)
                param.grad += noise
    model = Net()
    model_params = list(model.parameters())

    bobs_model = Net()
    alices_model = Net()

```

### Differential Privacy

We'll be using the techniques outlined in the paper [Deep Learning with Differential Privacy](https://arxiv.org/pdf/1607.00133.pdf) by Abadi et al to create a *differentially private SGD algorithm*. For more details about what differential privacy even is and the privacy guarantees provided by the algorithm, check out the paper. 

For the purposes of this post we'll focus on the 
modifications made to the SGD algorithm to make it differentially-private.





