<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'batchID' => 'required|unique:batch,batchID|size:5',				
            'totalLetters' => 'required|numeric|min:1',
            'location' => 'required|string|max:30',
            'userID' => 'required|size:5',
            'totalDelivered' => 'required|numeric',
            'isComplete' => 'required|numeric'
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'batchID.required' => 'BatchID is missing',
            'batchID.unique' => 'Batch ID has already been entered',
            'batchID.size' => 'Batch ID should be 5 characters long',
            'totalLetters.required' => 'Total Letters is missing',
            'totalLetters.numeric' => 'Total Letters should be a number',
            'totalLetters.min' => 'At least a letter should be delivered',
            'location.required' => 'location is required',
            'location.max' => 'Maximum characters are 30',
            'userID.required' => 'Choose a Mailman',            
        ];
    }
}
