---
title: Sample Note — PyTorch tensor shapes, from the ground up
date: 2026-10-03
tags: [python, pytorch, dl]
status: sample
excerpt: A sample learning note: the mental model behind tensor shapes, written while working through NVIDIA's Fundamentals of Deep Learning.
---

**Sample content.** This is a demo learning note. Replace it with your own notes as you go.

## The one mental model that made tensors click

A tensor is a nested container of numbers, and its **shape is just the size of each container level**:

```python
import torch

scalar = torch.tensor(4)                      # shape: []
vector = torch.tensor([1, 2, 3])              # shape: [3]
matrix = torch.tensor([[1, 2], [3, 4]])       # shape: [2, 2]
cube   = torch.tensor([[[1],[2]], [[3],[4]]]) # shape: [2, 2, 1]
```

When the shape confuses you, always ask: *how many entries at the first level?* That's `shape[0]`. The remaining shape describes what each of those entries looks like.

## Where geometry meets batches

A batch of 32 images, each 28×28, one channel: `[32, 1, 28, 28]`. The **batch dimension is the first one** — it has no meaning about the image itself, it just says "32 of these." Keeping the batch first is why `model(x)` works on a single image too: add a leading 1 → `[1, 1, 28, 28]`.

## The mistake that finally taught me this

I kept reading shapes *inside-out* (features first, batch last). Everything confused me until I read them outside-in: shape `[a, b, c]` = "a things, each of which is a `[b, c]` thing." When it stops being abstract geometry and becomes nesting, it stops being hard.