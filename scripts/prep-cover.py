"""Prepare the uploaded book cover for the web: resize to 2x display size and
export optimized PNG / WebP / JPEG, then report sizes."""
from PIL import Image
import os

SRC = '/home/z/my-project/upload/cover_preview.png'
OUT_DIR = '/home/z/my-project/public'

# Display size (lg book) is 224x316 CSS px -> 2x asset = 448x632 (keep aspect 0.7078)
im = Image.open(SRC).convert('RGB')
w, h = 448, round(448 / (im.width / im.height))
im2 = im.resize((w, h), Image.LANCZOS)
print('resized to', im2.size)

results = {}
im2.save(os.path.join(OUT_DIR, 'book-cover.png'), optimize=True)
results['png'] = os.path.getsize(os.path.join(OUT_DIR, 'book-cover.png'))

im2.save(os.path.join(OUT_DIR, 'book-cover.webp'), quality=90, method=6)
results['webp'] = os.path.getsize(os.path.join(OUT_DIR, 'book-cover.webp'))

im2.save(os.path.join(OUT_DIR, 'book-cover.jpg'), quality=90, optimize=True, progressive=True)
results['jpg'] = os.path.getsize(os.path.join(OUT_DIR, 'book-cover.jpg'))

print('sizes:', {k: f'{v/1024:.0f}KB' for k, v in results.items()})
best = min(results, key=results.get)
print('best:', best)
