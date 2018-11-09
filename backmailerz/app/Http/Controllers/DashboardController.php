<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Letter;


class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $letters = Letter::all();
        return view('home',compact('letters'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('home');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'senderPoBox' => 'required',
            'receiverPoBox' => 'required',
            'pickupBy' => 'required',
            'isDelivered' =>  'required',
            'receivedOn' => 'required',
            'receivedBy' => 'required',
            'batchID' => 'required',
            'receiverPhone' => 'required'

        ]); 

        $letter = new Letter();
        $letter->senderPoBox = $request->senderPoBox;
        $letter->receiverPoBox = $request->receiverPoBox;
        $letter->pickupBy = $request->pickupBy;
        $letter->isDelivered = $request->isDelivered;
        $letter->receivedOn = $request->receivedOn;
        $letter->receivedBy = $request->receivedBy;
        $letter->batchID = $request->batchID;
        $letter->receiverPhone = $request->receiverPhone;

        $lettter->save();
        
        return redirect()->roiute('admin.index');
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
