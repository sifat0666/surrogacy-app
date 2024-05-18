<?php

namespace App\Http\Controllers;

use Validator;
use Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;
use App\Http\Resources\BlogResource;
use App\Http\Resources\BlogFullResource;

class BlogController extends Controller
{
	public function index(Request $request)
	{
		$blogs = Blog::latest();

		if ($request->title) {
			$blogs->where('title', 'like', '%' . $request->title . '%');
		}

		if ($request->category) {
			$blogs->where('category', $request->category);
		}

		$blogs = BlogResource::collection($blogs->paginate(30))->response()->getData(true);

		return [
			'status' => 'success',
			'blogs' => $blogs,
		];
	}

	public function store(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'category' => 'required|string|in:General,Intended Parent,Surrogate,Agency',
			'title' => 'required|string|max:191',
			'image' => 'required|image',
			'content' => 'required|string',
			'seo_title' => 'nullable|string',
			'seo_desciption' => 'nullable|string',
			'seo_tags' => 'nullable|string',
		]);

		if ($validator->fails()) {
			return [
				'status' => 'validation_error',
				'messages' => $validator->errors()->all(),
			];
		}

		$input = $request->only([
			'category',
			'title',
			'content',
			'seo_title',
			'seo_desciption',
			'seo_tags',
		]);

		$image = $request->file('image')->store('/images/blogs', 'public');

		$input['image'] = $image;

		if (Blog::create($input)) {
			return [
				'status' => 'success',
				'message' => 'Success! Blog added successfully.',
			];
		}

		return [
			'status' => 'error',
			'message' => 'There was some error while adding blog, please try again.',
		];
	}

	public function show(Blog $blog)
	{
		return [
			'status' => 'success',
			'data' => new BlogFullResource($blog),
		];
	}

	public function update(Request $request, Blog $blog)
	{
		$validator = Validator::make($request->all(), [
			'category' => 'required|string|in:General,Intended Parent,Surrogate,Agency',
			'title' => 'required|string|max:191',
			'image' => 'nullable|image',
			'content' => 'required|string',
			'seo_title' => 'nullable|string',
			'seo_desciption' => 'nullable|string',
			'seo_tags' => 'nullable|string',
		]);

		if ($validator->fails()) {
			return [
				'status' => 'validation_error',
				'messages' => $validator->errors()->all(),
			];
		}

		$input = $request->only([
			'category',
			'title',
			'content',
			'seo_title',
			'seo_desciption',
			'seo_tags',
		]);

		$oldImage = null;

		if ($request->has('image')) {
			$oldImage = $blog->image;
			$image = $request->file('image')->store('/images/blogs', 'public');

			$input['image'] = $image;
		}

		if ($blog->update($input)) {
			if ($oldImage && $request->has('image')) {
				if (Storage::disk('public')->exists($oldImage)) {
					Storage::disk('public')->delete($oldImage);
				}
			}

			return [
				'status' => 'success',
				'message' => 'Success! Blog edited successfully.',
			];
		}

		return [
			'status' => 'error',
			'message' => 'There was some error while editing blog, please try again.',
		];
	}

	public function destroy(Blog $blog)
	{
		if ($blog->delete()) {
			if (Storage::disk('public')->exists($blog->image)) {
				Storage::disk('public')->delete($blog->image);
			}

			return [
				'status' => 'success',
				'message' => 'Success! Blog deleted successfully.',
			];
		}

		return [
			'status' => 'error',
			'message' => 'There was some error while deleting blog, please try again.',
		];
	}
}
