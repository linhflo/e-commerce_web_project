import React from "react";
import { order } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CART, DELETE_ITEM_CART } from "../../shared/constants/action-type";
import { getImageProduct } from "../../shared/untils";
const Cart = () => {
    const [inputs, setInputs] = React.useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const carts = useSelector(({ Cart }) => {
        return Cart.items;
    });
    const onUpdateItem = (e, id) => {
        const qty = parseInt(e.target.value);
        if (qty <= 0) {
            // eslint-disable-next-line no-restricted-globals
            const isConfirm = confirm("Bạn muốn xóa sản phẩm khỏi giỏ hang?");
            return isConfirm
                ? dispatch({
                    type: DELETE_ITEM_CART,
                    payload: {
                        id,
                    },
                })
                : dispatch({
                    type: UPDATE_CART,
                    payload: {
                        id,
                        qty: 1,
                    },
                })
        }
        dispatch({
            type: UPDATE_CART,
            payload: {
                id,
                qty,
            },
        });
    }
    const onDeleteItem = (e, id) => {
        const qty = parseInt(e.target.value);
        // eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("Bạn muốn xóa sản phẩm khỏi giỏ hang?");
        return isConfirm
            ? dispatch({
                type: DELETE_ITEM_CART,
                payload: {
                    id,
                },
            })
            : false;
    }
    const onChangeInput = (e)=>{
        const {name, value} = e.target;
        console.log(inputs);
        return setInputs({...inputs, [name]: value});
    }
    const onClickOrder = (e)=>{
        e.preventDefault();
        const items = carts?.map((item, index)=>({prd_id: item._id, qty: item.qty}))
        return order({
            items,
            ...inputs
        }).then(({data})=>{
            if(data.status==="success"){
                return navigate("/Success");
            }
        });
    }
    return (
        <>
            <div>
                {/*	Cart	*/}
                <div id="my-cart">
                    <div className="row">
                        <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
                        <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
                        <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                    </div>
                    <form method="post">
                        {
                            carts?.map((item, index) =>
                                <div className="cart-item row">
                                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                        <img src={getImageProduct(item.image)} />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                        <input
                                            onChange={(e) => onUpdateItem(e, item._id)}
                                            type="number"
                                            id="quantity"
                                            className="form-control form-blue quantity"
                                            value={item.qty} />
                                    </div>
                                    <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.qty * item.price)}</b>
                                        <a onClick={(e) => onDeleteItem(e, item._id)} href="#">Xóa</a>
                                    </div>
                                </div>
                            )
                        }

                        <div className="row">
                            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">

                            </div>
                            <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                            <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(carts?.reduce((total, item) => total + item.qty * item.price, 0))}</b></div>
                        </div>
                    </form>
                </div>
                {/*	End Cart	*/}
                {/*	Customer Info	*/}
                <div id="customer">
                    <form method="post">
                        <div className="row">
                            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                                <input 
                                    onChange={onChangeInput}
                                    placeholder="Họ và tên (bắt buộc)" 
                                    type="text" 
                                    name="name" 
                                    className="form-control" 
                                    value={inputs?.name}
                                    required />
                            </div>
                            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                                <input 
                                    onChange={onChangeInput}
                                    placeholder="Số điện thoại (bắt buộc)" 
                                    type="text" 
                                    name="phone" 
                                    className="form-control" 
                                    value={inputs?.phone}
                                    required />
                            </div>
                            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                                <input 
                                    onChange={onChangeInput}
                                    placeholder="Email (bắt buộc)" 
                                    type="text" 
                                    name="email" 
                                    className="form-control" 
                                    value={inputs?.email}
                                    required />
                            </div>
                            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                                <input 
                                    onChange={onChangeInput}
                                    placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" 
                                    type="text" 
                                    name="address" 
                                    value={inputs?.address}
                                    className="form-control" required />
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a onClick={onClickOrder} href="#">
                                <b>Mua ngay</b>
                                <span>Giao hàng tận nơi siêu tốc</span>
                            </a>
                        </div>
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <a href="#">
                                <b>Trả góp Online</b>
                                <span>Vui lòng call (+84) 0988 550 553</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/*	End Customer Info	*/}
            </div>

        </>
    )
}
export default Cart;