import React,{Component} from 'react'
import axios from 'axios'
import {NavLink} from "react-router-dom";

/*
     react ===> Spring ====> react
        요청   요청 처리 => 데이터 전송(저장)
                          ===============
                          클래스 전체 , 자바스크립트 전체에서 사용
                          state
        수행
        constructor() : 클래스 생성
        componentWillMount() : 메모리 저장 전 => 데이터 받기
        render() : HTML을 만들고 => 메모리 올리기
        componentDidMount() : 메모리에 있는 내용을 브라우저에 출력

        => 페이지 변경
           setState() => render() => componentDidMount()
           state

           public void display()
           {
              화면 변경
           }

           display()
           display()
 */
class ChefList extends Component{
   constructor(props) {
       super(props);
       // 멤버 변수 => 데이터가 변경이 되면 화면 변경
       this.state={
           chef:[],
           page:1,
           totalpage:0
       }
       // 이벤트 등록
       this.prev=this.prev.bind(this);
       this.next=this.next.bind(this);
   }
   // http://localhost:8080/web/react_chef/chef_list.do
    prev()
    {
        //this.setState({page:})
        this.state.page=this.state.page>1?this.state.page-1:this.state.page;
        this.post();
    }
    next()
    {
        this.state.page=this.state.page<this.state.totalpage?this.state.page+1:this.state.page;
        this.post();
    }
   post()
   {
       // 기본 디폴트 페이지 => 1
       axios({
           method:'POST',
           url:'http://localhost:8080/web/react_chef/chef_list.do',
           headers:{
               'Content-type':'application/x-www-form-urlencoding;charset=UTF-8'
           },
           params:{
               page:this.state.page
           }
       }).then((response)=>{
          console.log(response)
           this.setState({chef:response.data})
           //this.state.chef=response.data
           // 데이터 갱신 => 브라우저 갱신된 데이터 출력 render()호출
       })
   }
   componentWillMount() {
       axios.get("http://localhost:8080/web/react_chef/totalpage.do")
           .then((response)=>{
               this.setState({totalpage:response.data})
           })
       this.post();
   }
   /*
      [{"mc7":"28,847,911","chef":"노란장미","mc1":"2,052","mc3":"193,668","poster":"https:\/\/recipe1.ezmember.co.kr\/cache\/rpf\/2015\/09\/16\/1e41fad1add10fcf191979d2f85d928f1.jpg","mc2":"5,479"},{"mc7":"20,142,158","chef":"꽃청춘이주부","mc1":"369","mc3":"396,229","poster":"https:\/\/recipe1.ezmember.co.kr\/cache\/rpf\/2015\/08\/06\/f477e1d171e87b02accfd939cdb17c9e1.jpg","mc2":"7,749"},{"mc7":"13,270,663","chef":"엘린
    */
   render(){
       /*
             map(function(m){
                return (

                )
             })

             map((m)=>
             )

             자바 => 람다식

             JSX => JavaScript+XML

             application/json;charset=UTF-8
             text/plain;charset=UTF-8
        */
       const html=this.state.chef.map((m)=>
          <table className={"table"}>
            <tr>
                <td className={"text-center"} width={"30%"} rowSpan={"2"}>
                    <img src={m.poster} style={{"width":"200px","height":"80px"}}/>
                </td>
                <td colSpan={"4"} style={{"color":"orange"}}>
                    <h3>
                        <NavLink to={"/chef_detail/"+m.chef}>{m.chef}</NavLink>
                    </h3></td>
            </tr>
              <tr>
                  <td className={"text-left"}>
                      <img src={"1.png"}/>{m.mc1}
                  </td>
                  <td className={"text-left"}>
                      <img src={"3.png"}/>{m.mc3}
                  </td>
                  <td className={"text-left"}>
                      <img src={"7.png"}/>{m.mc7}
                  </td>
                  <td className={"text-left"}>
                      <img src={"2.png"}/>{m.mc2}
                  </td>
              </tr>
          </table>
       )
       return (
          <div className={"row"}>
              <h3 className={"text-center"}>쉐프 목록</h3>
              <table className={"table"}>
                  <tbody>
                    <tr>
                        <td>{html}</td>
                    </tr>
                  </tbody>
              </table>
              <table className={"table"}>
                  <tr>
                      <td className={"text-center"}>
                          <input type={"button"} onClick={this.prev}
                                 value={"이전"} className={"btn btn-sm btn-info"}/>
                          {this.state.page} page / {this.state.totalpage} pages
                          <input type={"button"} onClick={this.next}
                                 value={"다음"} className={"btn btn-sm btn-warning"}/>
                      </td>
                  </tr>
              </table>
          </div>
       )
   }
}
export default ChefList