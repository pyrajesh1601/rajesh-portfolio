# Portfolio portrait assets

Created with the built-in image generation tool using the three photos supplied by Rajesh. Photo 2 provides the pose; photos 1 and 3 support facial identity. Original photos were not added to the website source.

## Graphite prompt

Use case: identity-preserve. Create an editorial 3D sculptural portrait of the man in the three supplied photos for his professional developer portfolio. Image 2 is primary for the left-looking three-quarter pose; Images 1 and 3 support faithful identity. Preserve his recognizable facial geometry, voluminous swept hairstyle, moustache, nose, jaw and ear stud; no beautification or different person. Replace clothes with a minimal sculptural shoulder bust, entire bust rendered in matte charcoal graphite with subtle fine metallic texture. Landscape 16:9 hero composition: head and shoulders large on the RIGHT half, face looking slightly left, crown fully visible with breathing room, shoulders extend to lower edge; left 40 percent clean empty pale warm-gray background for website headline. Soft sophisticated studio light, dimensional facial modeling, elegant quiet premium design, no props, no original background, no text, no watermark. Background pale gray #ecebe9. Photorealistic sculptural material, identity faithful.

Output: `dist/assets/rajesh-graphite.png`

## Copper edit prompt

Use case: precise-object-edit, identity-preserve. Edit ONLY THE MATERIAL of the attached finished graphite portrait. This will be overlaid pixel-for-pixel for a cursor reveal, so preserve the EXACT 1672x941 landscape canvas size/aspect ratio, head and shoulder silhouette, every facial feature, hair strand geometry, ear stud, expression, pose, camera, subject location, lighting direction, and empty background. Keep the plain pale warm gray background unchanged. Change the sculptural bust and hair from gray graphite to premium warm polished copper / bronze, with rich burnt-orange highlights #b15f2c and #cf8047, refined metallic reflections and fine texture. Entire sculptural subject including face and hair should read as copper while remaining immediately recognizable. NO repositioning, NO zoom, NO framing changes, NO new elements, NO text. Output only the same image with this material change.

Output: `dist/assets/rajesh-copper.png`

## Integration

The graphite version is the hero's default image. The copper version is painted by the existing soft canvas cursor trail. Canvas cover positioning follows the hero image's CSS object-position at each breakpoint. Touch devices and reduced-motion users see a static graphite portrait.
