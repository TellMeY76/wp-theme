<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>
    <div class="inshow-product-page row"> <!-- 添加 "row" 类以方便布局控制 -->
        <div class="product-gallery-col col-lg-6"> <!-- 添加新的类以控制宽度 -->
            <?php
            // 商品画廊
            do_action( 'woocommerce_before_single_product_summary' );
            ?>
        </div>
        <div class="product-summary-col col-lg-6"> <!-- 商品信息栏，控制宽度 -->
            <?php
            // 商品标题、价格和详情摘要
            do_action( 'woocommerce_single_product_summary' );
            ?>
        </div>
    </div> <!-- 结束row -->

    <!-- 商品描述和其他的tab页 -->
    <div class="product-description-and-tabs">
        <?php do_action( 'woocommerce_after_single_product_summary' ); ?>
    </div>

    <?php
    /**
     * Hook: woocommerce_after_single_product.
     */
    do_action( 'woocommerce_after_single_product' );

    echo <<<HTML
        <div id="chatNowModal" class="chat-now-modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <form id="chatForm">
                    <h4 class="modal-title">Please enter your mailbox</h4>
                    <div class="chatForm-item">
                        <label>Email:</label>
                        <input type="email" id="userEmail" name="user_email" placeholder="Enter your email" required />
                     </div>
                    <div class="operation-btns">
                         <button type="submit" class="button submit-email">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    HTML;
    ?>
</div>
