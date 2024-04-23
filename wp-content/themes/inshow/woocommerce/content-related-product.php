<div class="custom-related-product">
    <a href="<?php echo esc_url( get_permalink( $product->get_id() ) ); ?>" title="<?php echo esc_attr( $product->get_name() ); ?>">
       <div class="related-product-img">
            <?php echo $product->get_image(); ?>
       </div> 
        <h3  class="related-product-title"><?php echo esc_html( $product->get_name() ); ?></h3>
    </a>

    <div class="related-product-badges">
            <!-- 显示价格和折扣信息 -->
        <?php
            // 获取原始价格
            $regular_price = $product->get_regular_price();
            
            // 获取销售价格
            $sale_price = $product->get_sale_price();
            
            // 判断是否有折扣
            if ( $sale_price && $sale_price != $regular_price ) :
                // 计算折扣百分比
                $discount_percentage = round( ( ( $regular_price - $sale_price ) / $regular_price ) * 100 );
                // 输出折扣信息
                echo '<span class="related-product-badge discount-badge">'.__( '', 'your-text-domain' ).$discount_percentage.'% OFF</span>';
            endif;
        ?>

        <!-- 显示是否为新品 -->
        <?php
            // 获取产品发布日期
            $date_published = $product->get_date_created();
            
            // 设定新品的时间阈值，比如30天内发布的视为新品
            $new_product_threshold = strtotime('-30 days');

            // 判断是否为新品
            if ( $date_published > $new_product_threshold ) :
                echo '<span class="related-product-badge new-badge">'.__( 'New', 'your-text-domain' ).'</span>';
            endif;
            echo '<span class="related-product-badge new-badge">'.__( 'New', 'your-text-domain' ).'</span>';

        ?>
    </div>
</div>
