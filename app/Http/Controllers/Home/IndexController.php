<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //无限分类
    public static function getCateByPid($pid){
        $res = DB::table('cate')->where('pid','=',$pid)->orderBy('id','asc')->get();
        $data = [];
        //遍历
        foreach($res as $value){
            $value->dev = self::getCateByPid($value->id);
            $data[] = $value;
        }
        return $data;
    }

    //面包屑
    public static function getParents($cate_id){
        $data = [];
        while($cate_id){
            $res = DB::table('cate')->where('id','=',$cate_id)->first();
            array_unshift($data,array('cate_id'=>$res->id,'cate_name'=>$res->name));
            $cate_id = $res->pid;
        }
        return $data;
    }

    public function index()
    {
        //获取数据
        $cate = self::getCateByPid(0);
        //获取公告
        $notices = DB::table('notice')->orderBy('id','asc')->get();
        //获取热销商品
        $hotgoods = DB::table('goods')->join('goods_spec','goods.id','=','goods_spec.gid')->join('spec_info','goods_spec.id','=','spec_info.spec_id')->select('goods.name as gname','goods.logo as glogo','goods.price as gprice','spec_info.desc as sdesc','goods.id as gid')->orderBy('spec_info.sale','desc')->offset(0)->limit(8)->get();
        //商品列表
        $goods = DB::table('goods')->join('cate','goods.cate_id','=','cate.id')->select('goods.name as gname','goods.price as gprice','goods.logo as glogo','cate.pid as cid','goods.id as gid')->get();

        //加载前台首页
        return view('Home.Index.index',['cate'=>$cate,'notices'=>$notices,'hotgoods'=>$hotgoods,'goods'=>$goods]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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

    //商品列表
    public function goodslists($id){
        //获取数据 
        //检测是否为顶级分类,是的话显示所有数据
        $info = DB::table('cate')->where('id','=',$id)->first();
        if($info->pid == 0){
            //顶级分类 
            $info->pids = $info->id;
            //获取该分类的所有子类的商品
            $data = DB::table('cate')->join('goods','cate.id','=','goods.cate_id')->where('cate.pid','=',$id)->select('goods.name as gname','goods.logo as glogo','goods.price as gprice','goods.id as gid')->get();
            //获取分类
            $cate = DB::table('cate')->where('pid','=',$id)->get();
            return view('Home.Index.goodslist',['data'=>$data,'info'=>$info,'cate'=>$cate]);        
        }else {
            //子集分类 
            $info->pids = $info->pid;
            //获取该分类的所有子类的商品
            $data = DB::table('cate')->join('goods','cate.id','=','goods.cate_id')->where('cate.id','=',$id)->select('goods.name as gname','goods.logo as glogo','goods.price as gprice','goods.id as gid')->get();
            //获取分类
            $cate = DB::table('cate')->where('pid','=',$info->pid)->get();
            return view('Home.Index.goodslist',['data'=>$data,'info'=>$info,'cate'=>$cate]);
        }
    }

    //商品详情
    public function goodsinfo($id){
        // 获取商品数据
        // $goods = DB::table('goods')->join('goods_spec','goods.id','=','goods_spec.gid')->select('goods.cate_id','goods.name','goods.id as gid','goods_spec.id as gsid','goods_spec.color','goods_spec.pic as gspic')->where('goods.id','=',$id)->orderBy('goods_spec.id','asc')->get();
        $goods = DB::table('goods')->where('id','=',$id)->first();
        //获取颜色和图片
        $spec = DB::table('goods_spec')->where('gid','=',$goods->id)->orderBy('id','asc')->get();
        foreach ($spec as $key => $value) {
            $spec[$key]->pic = explode('@', $value->pic);
        }
        //获取详情
        $info = DB::table('spec_info')->where('spec_id','=',$spec[0]->id)->orderBy('id','asc')->get();
        //获取面包屑
        $crumbs = self::getParents($goods->cate_id);
        return view('Home.Index.goodsinfo',['crumbs'=>$crumbs,'goods'=>$goods,'info'=>$info,'spec'=>$spec]);
    }

    //更换商品颜色
    public function goodscolor(Request $request){
        $cid = $request->input('cid');
        echo $cid;
    }
}
